
import { useState, useEffect } from "react";



export default function Home() {
  console.clear();

  const [audioData, setAudioData] = useState(null);





  function handleOnDragEnter(e) {}
  function handleOnDragOver(e) {e.preventDefault();}
  function handleOnDragLeave(e) {}



  function handleOnDrop(e) {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];
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
    }

  }





  return (<div className="bg-green-200">
    <h1>Wav Parser</h1>


    <div className="flex flex-col items-center justify-center h-[500] bg-gray-100"
    onDrop={handleOnDrop}
    onDragOver={handleOnDragOver}


    >

  drop files here
    </div>
{
audioData && <div>Result:

<p>chunk Id: {audioData.chunkId}</p>
<p>chunk Size: {audioData.chunkSize}</p>
<p>chunk Format: {audioData.format}</p>
<p>chunk Sub Chunk ID: {audioData.subChunk1Id}</p>
<p>chunk Audio Format: {audioData.audioFormat}</p>
<p>chunk Num Channels: {audioData.numChannels}</p>
<p>chunk Sample Rate: {audioData.sampleRate}</p>
<p>chunk Byte Rate: BYTE {audioData.byteRate}</p>
<p>chunk Block Align: {audioData.blockAlign}</p>
<p>chunk Bits Per Sample: {audioData.bitsPerSample}</p>



</div>
}



    </div>
  );
}
