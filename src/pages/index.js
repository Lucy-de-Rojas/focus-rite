
import { useState, useEffect } from "react";



export default function Home() {
  console.clear();

  const [audioData, setAudioData] = useState(null);
  const [message, setMessage] = useState(">> Drop Files Here <<");
  const[allowDrop, setAllowDrop] = useState(false);



  let rowStyling = "bg-[--grey] py-4 pl-3 content-center";
  let red = "#f07777";
  let green = "rgb(165, 241, 141)";







function handleOnDragLeave(e) {
  e.preventDefault();
  setMessage(">> Drop Files Here <<");
  let dropBox = document.getElementById("dropBox");
  dropBox.style.backgroundColor = "white";
}






  function handleOnDragOver(e) {
    e.preventDefault();
    let dropBox = document.getElementById("dropBox");
    dropBox.style.backgroundColor = "gray";

  }















  function handleOnDrop(e) {
    e.preventDefault();
    let dropBox = document.getElementById("dropBox");


    const files = e.dataTransfer.files;

    if (files.length > 0) {

      const file = files[0];


      if (file.type == "audio/wav") {

        dropBox.style.backgroundColor = green;
        dropBox.style.color = "black";

      const reader = new FileReader();
      reader.onload = function(event) {
      const arrayBuffer = event.target.result;
      const dataView = new DataView(arrayBuffer);

      const header = {
        chunkId: String.fromCharCode(dataView.getUint8(0)) + String.fromCharCode(dataView.getUint8(1)) + String.fromCharCode(dataView.getUint8(2)) + String.fromCharCode(dataView.getUint8(3)),
        chunkSize: dataView.getUint32(4, true),
        format: String.fromCharCode(dataView.getUint8(8)) + String.fromCharCode(dataView.getUint8(9)) + String.fromCharCode(dataView.getUint8(10)) + String.fromCharCode(dataView.getUint8(11)),
        subChunk1Id: String.fromCharCode(dataView.getUint8(12)) + String.fromCharCode(dataView.getUint8(13)) + String.fromCharCode(dataView.getUint8(14)) + String.fromCharCode(dataView.getUint8(15)),
        subChunk1Size: dataView.getUint32(16, true),
        audioFormat: dataView.getUint16(20, true),
        numChannels: dataView.getUint16(22, true),
        sampleRate: dataView.getUint32(24, true),
        byteRate: dataView.getUint32(28, true),
        blockAlign: dataView.getUint16(32, true),
        bitsPerSample: dataView.getUint16(34, true),
        subChunk2Id: String.fromCharCode(dataView.getUint8(36)) + String.fromCharCode(dataView.getUint8(37)) + String.fromCharCode(dataView.getUint8(38)) + String.fromCharCode(dataView.getUint8(39)),
        subChunk2Size: dataView.getUint32(40, true),
      };

      console.log(header);
      setAudioData(header);
      };
      reader.readAsArrayBuffer(file);
      setMessage(">> File Dropped <<");
    }
    else {
      setMessage("!! Invalid File Type, Needs To Be WAV !!");
      setAudioData(null);
      dropBox.style.backgroundColor = red;
    }
  }
}





  return (<div className="bg-[--black] text-center">
    <h1 className="py-10 text-[yellow] text-2xl">File Extractor</h1>


    <div className="flex flex-col items-center justify-center h-[500px] bg-gray-100"
    onDrop={handleOnDrop}
    onDragOver={handleOnDragOver}
    onDragLeave={handleOnDragLeave}
    id="dropBox"


    >

  {message}
    </div>




    {/* result: */}
{
audioData && <div className="text-[--white] mb-12 p-5 bg-[--grey]">
  <h2 className="text-center text-[--white] text-2xl py-2 mb-10">
    Result
    </h2>

<div className="grid grid-cols-2 gap-1 text-left bg-slate-300 p-2 rounded-lg">

<p className="bg-gray-600 py-4 pl-3 content-center">Header</p><p className="bg-gray-600 py-4 pl-3 content-center">Value</p>


<p className={rowStyling}>chunk Id</p><p className={rowStyling}>{audioData.chunkId}</p>
<p className={rowStyling}>chunk Size</p><p className={rowStyling}> {audioData.chunkSize}</p>
<p className={rowStyling}>chunk Format</p><p className={rowStyling}> {audioData.format}</p>

<p className={rowStyling}>chunk Sub Chunk ID</p><p className={rowStyling}> {audioData.subChunk1Id}</p>
<p className={rowStyling}>chunk Audio Format</p><p className={rowStyling}> {audioData.audioFormat}</p>
<p className={rowStyling}>chunk Num Channels</p><p className={rowStyling}> {audioData.numChannels}</p>
<p className={rowStyling}>chunk Sample Rate</p><p className={rowStyling}> {audioData.sampleRate}</p>
<p className={rowStyling}>chunk Byte Rate</p><p className={rowStyling}> BYTE {audioData.byteRate}</p>
<p className={rowStyling}>chunk Block Align</p><p className={rowStyling}> {audioData.blockAlign}</p>
<p className={rowStyling}>chunk Bits Per Sample</p><p className={rowStyling}> {audioData.bitsPerSample}</p>
</div>



</div>
}



    </div>
  );
}
