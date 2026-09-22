'use client';
export default function ShareButton({name}:{name:string}){const share=async()=>{const text='私の美容タイプは「'+name+'」でした。\nBIYOSELECT BEAUTY TYPE診断';if(navigator.share){await navigator.share({title:'BIYOSELECT診断結果',text,url:location.href});}else{await navigator.clipboard.writeText(text+'\n'+location.href);alert('診断結果をコピーしました');}};return <button onClick={share}>結果をシェア</button>}
