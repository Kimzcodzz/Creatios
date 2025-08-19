import { createContext, useContext, useEffect, useState } from 'react';
import en from '../../locales/en.json'; import es from '../../locales/es.json'; import fr from '../../locales/fr.json'; import pt from '../../locales/pt.json'; import ar from '../../locales/ar.json';
const locales={en,es,fr,pt,ar}; const def=process.env.NEXT_PUBLIC_DEFAULT_LANG||'en';
const C=createContext(); export const LocaleProvider=({children})=>{ const [lang,setLang]=useState(def); const t=(k)=>(locales[lang]&&locales[lang][k])||k;
useEffect(()=>{(async()=>{ try{ const r=await fetch('/api/settings'); if(r.ok){const d=await r.json(); if(d?.defaultLang&&locales[d.defaultLang]) setLang(d.defaultLang);} }catch{}})();},[]);
return <C.Provider value={{lang,setLang,t}}>{children}</C.Provider>; }; export const useLocale=()=>useContext(C);