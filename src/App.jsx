import React, { useEffect, useState } from 'react';
import { boundedDimension, makeConfig, FORMATS } from './core.js';

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [dimensions, setDimensions] = useState({width:1024,height:1024});
  const [original, setOriginal] = useState({width:1024,height:1024});
  const [locked, setLocked] = useState(true);
  const [format, setFormat] = useState('image/png');
  const [quality, setQuality] = useState(85);
  const [tab, setTab] = useState('image');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [name,setName] = useState('My Android App');
  const [url,setUrl] = useState('https://example.com');
  const [packageName,setPackageName] = useState('com.example.myapp');
  const [themeColor,setThemeColor] = useState('#2563eb');
  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    const img = new Image();
    img.onload = () => { setOriginal({width:img.naturalWidth,height:img.naturalHeight}); setDimensions({width:img.naturalWidth,height:img.naturalHeight}); };
    img.onerror = () => setError('Unable to read this image.');
    img.src = objectUrl;
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  const selectFile = (f) => {
    setError(''); setMessage('');
    if (!f) return;
    if (!FORMATS.includes(f.type)) { setError('Choose a PNG, JPG or WebP image.'); return; }
    if (f.size > 15 * 1024 * 1024) { setError('Maximum image size is 15MB.'); return; }
    setFile(f);
  };
  const setDimension = (axis, value) => {
    setDimensions(old => {
      const n = Number(value);
      if (!locked || !Number.isFinite(n) || !n) return {...old,[axis]:value};
      const ratio = original.width / original.height;
      return axis === 'width' ? {width:value,height:Math.round(n/ratio)} : {width:Math.round(n*ratio),height:value};
    });
  };
  const exportImage = async () => {
    setError(''); setMessage('');
    try {
      if (!preview) throw new Error('Upload an image first.');
      const width = boundedDimension(dimensions.width);
      const height = boundedDimension(dimensions.height);
      const img = new Image();
      img.src = preview;
      await img.decode();
      const canvas = document.createElement('canvas');
      canvas.width=width; canvas.height=height;
      const ctx=canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas unavailable in this browser.');
      if (format==='image/jpeg') {ctx.fillStyle='#ffffff';ctx.fillRect(0,0,width,height);}
      ctx.drawImage(img,0,0,width,height);
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,format,quality/100));
      if (!blob) throw new Error('Image encoding failed.');
      const href=URL.createObjectURL(blob);
      const link=document.createElement('a');
      link.href=href;
      link.download='pixelsynx-export.'+(format==='image/jpeg'?'jpg':format.split('/')[1]);
      link.click();
      setTimeout(()=>URL.revokeObjectURL(href),1000);
      setMessage('Image exported successfully.');
    } catch(e) { setError(e.message); }
  };
  const exportConfig = () => {
    setError('');setMessage('');
    try {
      const config=makeConfig({name,url,packageName,themeColor});
      const blob=new Blob([JSON.stringify(config,null,2)],{type:'application/json'});
      const href=URL.createObjectURL(blob);
      const link=document.createElement('a');
      link.href=href;link.download='android-project-config.json';link.click();
      setTimeout(()=>URL.revokeObjectURL(href),1000);
      setMessage('Android configuration exported. This is not an APK.');
    } catch(e) {setError(e.message);}
  };
  return <main className="shell">
    <header><div className="mark">P</div><div><strong>Web2APK Image Studio</strong><small>PixelSynx Labs · Open Source</small></div><a href="https://github.com/freeamit/web2apk-image-studio" target="_blank" rel="noreferrer">GitHub ↗</a></header>
    <section className="hero"><span>Developer toolkit · v0.1</span><h1>Image tools and Android project starters.</h1><p>Process images locally in your browser and prepare validated configuration for Android packaging.</p></section>
    <nav aria-label="Tools"><button className={tab==='image'?'active':''} onClick={()=>{setTab('image');setError('');setMessage('');}}>Image Studio</button><button className={tab==='android'?'active':''} onClick={()=>{setTab('android');setError('');setMessage('');}}>Android Starter</button></nav>
    {tab==='image' ? <section className="workspace"><div className="panel">
      <h2>Source image</h2><label className="drop">Choose PNG, JPEG or WebP<input aria-label="Choose an image" type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>selectFile(e.target.files?.[0])}/><span>Up to 15MB · Your file stays in this browser</span></label>
      <div className="two"><label>Width (px)<input type="number" value={dimensions.width} onChange={e=>setDimension('width',e.target.value)}/></label><label>Height (px)<input type="number" value={dimensions.height} onChange={e=>setDimension('height',e.target.value)}/></label></div>
      <label className="inline"><input type="checkbox" checked={locked} onChange={e=>setLocked(e.target.checked)}/> Preserve original aspect ratio</label>
      <label>Export format<select value={format} onChange={e=>setFormat(e.target.value)}>{FORMATS.map(f=><option key={f} value={f}>{f.split('/')[1].toUpperCase()}</option>)}</select></label>
      {format!=='image/png' && <label>Quality: {quality}%<input aria-label="Image export quality" type="range" min="30" max="100" value={quality} onChange={e=>setQuality(Number(e.target.value))}/></label>}
      <button className="primary" onClick={exportImage}>Export image</button></div>
      <div className="panel preview"><h2>Preview</h2>{preview?<img src={preview} alt="Selected image preview"/>:<div className="empty">Choose an image to preview it here.</div>}<p>Output resizing happens on export.</p></div></section>
    : <section className="workspace"><div className="panel"><h2>Android project configuration</h2><p>Export a JSON specification for a future Trusted Web Activity build.</p><label>App name<input value={name} onChange={e=>setName(e.target.value)}/></label><label>HTTPS website<input value={url} onChange={e=>setUrl(e.target.value)}/></label><label>Android package name<input value={packageName} onChange={e=>setPackageName(e.target.value)}/></label><label>Theme color<input type="color" value={themeColor} onChange={e=>setThemeColor(e.target.value)}/></label><button className="primary" onClick={exportConfig}>Download configuration</button></div><div className="panel"><h2>What happens next?</h2><p>Use Android tooling to create, sign and test the actual application. Trusted Web Activity requires domain ownership verification and a valid <code>assetlinks.json</code> file.</p><p><strong>Note:</strong> This starter exports configuration only. It cannot compile or sign an APK.</p></div></section>}
    {error&&<p className="alert" role="alert">{error}</p>}{message&&<p className="success" role="status">{message}</p>}
    <footer>MIT licensed · Built for browser-first creative tooling · No API keys required</footer>
  </main>;
}
