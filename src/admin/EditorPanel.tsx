import { 
  XCircle, Send, Image as ImageIcon, Loader2, 
  Bold, Italic, Underline as UnderlineIcon, List, Heading1, Heading2, 
  Tag as TagIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, 
  Undo, Redo, Quote, Highlighter, ListOrdered
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';

interface EditorPanelProps {
  item: any;
  type: 'faqs' | 'orders' | 'blog';
  onClose: () => void;
  onRefresh: () => void;
}

// --- FULL RICH TEXT TOOLBAR ---
const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  const btnClass = (active: boolean) => 
    `p-2 border-2 border-[#0a2342] transition-all flex items-center justify-center ${
      active 
        ? 'bg-[#ff6a00] text-white shadow-none translate-x-[1px] translate-y-[1px]' 
        : 'bg-white text-[#0a2342] shadow-[2px_2px_0px_0px_#0a2342] hover:bg-[#f0f2f5]'
    }`;

  const Divider = () => <div className="w-[2px] h-6 bg-[#0a2342]/20 mx-1 self-center" />;

  return (
    <div className="flex flex-wrap gap-2 mb-4 p-4 bg-[#f0f2f5] border-2 border-[#0a2342] sticky top-0 z-20 shadow-[4px_4px_0px_0px_rgba(10,35,66,1)]">
      <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={btnClass(false)} title="Undo"><Undo size={14} /></button>
      <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={btnClass(false)} title="Redo"><Redo size={14} /></button>
      <Divider />
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Bold"><Bold size={14} /></button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Italic"><Italic size={14} /></button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))} title="Underline"><UnderlineIcon size={14} /></button>
      <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={btnClass(editor.isActive('highlight'))} title="Highlight"><Highlighter size={14} /></button>
      <Divider />
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btnClass(editor.isActive('heading', { level: 1 }))} title="Heading 1"><Heading1 size={14} /></button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))} title="Heading 2"><Heading2 size={14} /></button>
      <Divider />
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Bullet List"><List size={14} /></button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Numbered List"><ListOrdered size={14} /></button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))} title="Quote"><Quote size={14} /></button>
      <Divider />
      <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={btnClass(editor.isActive({ textAlign: 'left' }))} title="Align Left"><AlignLeft size={14} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={btnClass(editor.isActive({ textAlign: 'center' }))} title="Align Center"><AlignCenter size={14} /></button>
      <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={btnClass(editor.isActive({ textAlign: 'right' }))} title="Align Right"><AlignRight size={14} /></button>
    </div>
  );
};

export default function EditorPanel({ item, type, onClose, onRefresh }: EditorPanelProps) {
  // --- STATES ---
  const [title, setTitle] = useState(item.title || "");
  const [tagsInput, setTagsInput] = useState(item.tags?.join(', ') || "");
  const [previewUrl, setPreviewUrl] = useState(item.image_url || null);
  const [caption, setCaption] = useState(item.image_caption || "");
  const [uploading, setUploading] = useState(false);
  const [unavailableReason, setUnavailableReason] = useState(""); 
  const [category, setCategory] = useState(item.category || "");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline, 
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: item.content || item.answer || "",
    editorProps: {
      attributes: {
        class: 'prose prose-slate focus:outline-none min-h-[400px] p-6 font-serif text-lg leading-relaxed bg-white border-2 border-[#0a2342] shadow-[4px_4px_0px_0px_#0a2342]',
      },
    },
  });

  // --- STABLE LOAD & READ LOGIC ---
  useEffect(() => {
    if (editor && item) {
      editor.commands.setContent(item.content || item.answer || "");
      setTitle(item.title || "");
      setTagsInput(item.tags?.join(', ') || "");
      setPreviewUrl(item.image_url || null);
      setCaption(item.image_caption || "");
      setCategory(item.category || "");
      setUnavailableReason(""); 

      // Silent background read update (No onRefresh here to prevent panel closing)
      const markAsRead = async () => {
        if (item.is_read === false) {
          const table = type === 'blog' ? 'blog_posts' : type === 'orders' ? 'special_orders' : 'faqs';
          await supabase.from(table).update({ is_read: true }).eq('id', item.id);
        }
      };
      markAsRead();
    }
  }, [item.id, editor]); 

  // --- HANDLERS ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileName = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      setPreviewUrl(data.publicUrl);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleBlogSubmit = async () => {
    const processedTags = tagsInput.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== "");
    const postData = {
      title,
      content: editor?.getHTML(),
      tags: processedTags,
      image_url: previewUrl,
      image_caption: caption,
      is_published: true,
      is_read: true
    };
    const { error } = item.id 
      ? await supabase.from('blog_posts').update(postData).eq('id', item.id)
      : await supabase.from('blog_posts').insert([postData]);
    
    if (!error) { 
      onRefresh(); 
      onClose(); 
    }
  };

  const handleFaqSubmit = async () => {
    if (!category) {
      alert("Please select a category before delivering.");
      return;
    }
    const { error } = await supabase
      .from('faqs')
      .update({ 
        answer: editor?.getHTML(), 
        category: category,
        status: 'answered',
        is_read: true 
      })
      .eq('id', item.id);

    if (!error) { onRefresh(); onClose(); }
  };

  const handleFaqDismiss = async () => {
    const { error } = await supabase.from('faqs').update({ status: 'dismissed', is_read: true }).eq('id', item.id);
    if (!error) { onRefresh(); onClose(); }
  };    

  const handleOrderStatus = async (status: string) => {
    const { error } = await supabase.from('special_orders').update({ status, is_read: true }).eq('id', item.id);
    if (!error) {
      // Background Email Trigger
      try {
        fetch('/api/order-status-email', { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ 
            email: item.email, 
            customer_name: item.customer_name, 
            item_name: item.item_name, 
            status: status,
            reason: status === 'unavailable' ? unavailableReason : undefined
          }) 
        });
      } catch (e) { console.warn("Email service not reachable"); }
      onRefresh(); 
      onClose();
    }
  };

  return (
    <aside className="w-[700px] bg-[#fdfcf5] border-l-4 border-[#0a2342] p-12 flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-300 overflow-y-auto h-screen sticky top-0">
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-8 right-8 border-2 border-[#0a2342] p-2 hover:bg-[#ff6a00] transition-colors shadow-[2px_2px_0px_0px_#0a2342] active:shadow-none bg-white z-50"
      >
        <XCircle size={24}/>
      </button>
      
      {/* --- BLOG COMPOSER --- */}
      {type === 'blog' ? (
        <div className="space-y-10">
          <header>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#0a2342]">Article <span className="text-[#ff6a00]">Composer.</span></h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mt-1 italic">Editorial Suite</p>
          </header>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Headline</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 border-2 border-[#0a2342] font-black uppercase text-xs outline-none" placeholder="ARTICLE TITLE" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 flex items-center gap-2"><TagIcon size={12} /> Tags (Comma Separated)</label>
              <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className="w-full p-4 border-2 border-[#0a2342] font-black uppercase text-xs outline-none" placeholder="Board Games, RC, Events" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Body Content</label>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Featured Visual</label>
            <div className="relative aspect-video bg-white border-2 border-dashed border-[#0a2342]/20 flex items-center justify-center overflow-hidden group hover:border-[#ff6a00] transition-all">
              {previewUrl ? <img src={previewUrl} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="opacity-10" size={48} />}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
              {uploading && <div className="absolute inset-0 bg-white/90 flex items-center justify-center font-black uppercase text-xs"><Loader2 className="animate-spin mr-3"/> Archiving...</div>}
            </div>
          </div>

          <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Image Caption</label>
              <input value={caption} onChange={(e) => setCaption(e.target.value)} className="w-full p-4 border-2 border-[#0a2342] font-black uppercase text-xs outline-none" placeholder="Caption for the photo" />
          </div>

          <button onClick={handleBlogSubmit} className="w-full bg-[#ff6a00] text-[#0a2342] font-black uppercase py-6 border-2 border-[#0a2342] shadow-[6px_6px_0px_0px_#0a2342] flex items-center justify-center gap-3 hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all active:shadow-none">
            <Send size={18}/> Publish Dispatch
          </button>
        </div>

      /* --- FAQ STUDIO --- */
      ) : type === 'faqs' ? (
        <div className="space-y-10">
           <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#0a2342]">FAQ <span className="text-[#ff6a00]">Studio.</span></h2>
           <div className="p-8 bg-white border-2 border-dashed border-[#0a2342]/20 font-serif italic text-xl leading-relaxed text-[#0a2342]/80">"{item.question}"</div>

           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Assign Category (Required)</label>
              <div className="grid grid-cols-3 gap-3">
                {['Store Policies', 'Services & Orders', 'Events & Gaming'].map((cat) => (
                  <button key={cat} onClick={() => setCategory(cat)}
                    className={`p-3 border-2 text-[9px] font-black uppercase tracking-tight transition-all
                      ${category === cat ? 'bg-[#ff6a00] border-[#0a2342] text-white shadow-none translate-x-1 translate-y-1' : 'bg-white border-[#0a2342] text-[#0a2342] shadow-[3px_3px_0px_0px_#0a2342] hover:bg-[#f0f2f5]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
           </div>
           
           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40">Draft Response</label>
              <MenuBar editor={editor} />
              <EditorContent editor={editor} />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
             <button onClick={handleFaqSubmit} className="w-full bg-[#ff6a00] text-[#0a2342] font-black uppercase py-5 border-2 border-[#0a2342] shadow-[4px_4px_0px_0px_#0a2342] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">Deliver Reply</button>
             <button onClick={handleFaqDismiss} className="w-full bg-white text-red-600 font-black uppercase py-5 border-2 border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] transition-all">Dismiss</button>
           </div>
        </div>

      /* --- ORDER CONTROL --- */
      ) : (
        <div className="space-y-10">
          <header>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-[#0a2342]">Order <span className="text-[#ff6a00]">Control.</span></h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mt-1 italic">Customer Request Ticket</p>
          </header>

          <div className="bg-white border-2 border-[#0a2342] shadow-[8px_8px_0px_0px_#0a2342] overflow-hidden">
            <div className="bg-[#0a2342] text-white p-6">
              <h3 className="font-black text-2xl uppercase tracking-tighter leading-none mb-2">{item.customer_name}</h3>
              <p className="font-serif italic text-[#ff6a00] text-sm">{item.phone} • {item.email}</p>
            </div>

            <div className="p-8 grid grid-cols-2 gap-8 border-b-2 border-dashed border-[#0a2342]/20">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#0a2342]/40 mb-1">Brand</p>
                <p className="font-black text-xl text-[#0a2342] uppercase">{item.brand || 'N/A'}</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#0a2342]/40 mb-1">SKU / Part #</p>
                <p className="font-black text-xl text-[#ff6a00] uppercase">{item.sku || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#0a2342]/40 mb-1">Item Name</p>
                <p className="font-black text-2xl text-[#0a2342] uppercase">{item.item_name}</p>
              </div>
            </div>

            {item.image_url && (
              <div className="p-8 border-b-2 border-dashed border-[#0a2342]/20 bg-[#fdfcf5]/50">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#0a2342]/40 mb-4">Reference Image</p>
                <a href={item.image_url} target="_blank" rel="noopener noreferrer" className="block border-2 border-[#0a2342] overflow-hidden relative group">
                  <img src={item.image_url} alt="Reference" className="w-full h-auto max-h-48 object-cover bg-white" />
                  <div className="absolute inset-0 bg-[#0a2342]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-black uppercase text-xs tracking-widest">View Full Size</span>
                  </div>
                </a>
              </div>
            )}

            <div className="p-8 bg-[#fdfcf5]">
              <div className="flex justify-between items-center mb-4">
                 <p className="text-[9px] font-black uppercase tracking-widest text-[#0a2342]/40">Date Requested</p>
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#0a2342]">{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Unknown'}</p>
              </div>
              {item.description && (
                <div className="mt-6 border-t-2 border-[#0a2342]/10 pt-6">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#0a2342]/40 mb-2">Additional Notes</p>
                  <p className="font-serif italic text-sm text-[#0a2342]/80 leading-relaxed">{item.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4">
            {['ordered', 'arrived', 'picked_up'].map(s => (
              <button key={s} onClick={() => handleOrderStatus(s)} className="p-5 border-2 border-[#0a2342] bg-white font-black uppercase text-sm hover:bg-[#0a2342] hover:text-white transition-all shadow-[4px_4px_0px_0px_#0a2342] active:shadow-none">Mark as {s.replace('_', ' ')}</button>
            ))}
            
            <div className="pt-8 mt-6 border-t-2 border-dashed border-[#0a2342]/10 space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-red-600">Cancellation Reason (Sent to Customer)</label>
              <textarea value={unavailableReason} onChange={(e) => setUnavailableReason(e.target.value)} placeholder="Why is this unavailable?" className="w-full p-4 border-2 border-red-600/50 font-serif italic text-sm outline-none h-24" />
              <button onClick={() => handleOrderStatus('unavailable')} className="w-full p-5 border-2 border-red-600 bg-white text-red-600 font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">Mark Item Unavailable</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}