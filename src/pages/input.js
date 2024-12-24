import React, { useState } from "react";



export default function Input () {


        const [audioData, setAudioData] = useState(null);
  let rowStyling = "bg-[--grey] py-4 pl-3 content-center";

























  function handleSubmit(e) {
        e.preventDefault();


        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];

        if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                        const arrayBuffer = event.target.result;
                        const dataView = new DataView(arrayBuffer);

                        const header = {
                                chunkId: String.fromCharCode(dataView.getUint8(0)) + String.fromCharCode(dataView.getUint8(1)) + String.fromCharCode(dataView.getUint8(2)) + String.fromCharCode(dataView.getUint8(3)),
                                chunkSize: dataView.getUint32(4, true),
                                format: String.fromCharCode(dataView.getUint8(8)) + String.fromCharCode(dataView.getUint8(9)) + String.fromCharCode(dataView.getUint8(10)) + String.fromCharCode(dataView.getUint8(11)),
                                subchunk1Id: String.fromCharCode(dataView.getUint8(12)) + String.fromCharCode(dataView.getUint8(13)) + String.fromCharCode(dataView.getUint8(14)) + String.fromCharCode(dataView.getUint8(15)),
                                subchunk1Size: dataView.getUint32(16, true),
                                audioFormat: dataView.getUint16(20, true),
                                numChannels: dataView.getUint16(22, true),
                                sampleRate: dataView.getUint32(24, true),
                                byteRate: dataView.getUint32(28, true),
                                blockAlign: dataView.getUint16(32, true),
                                bitsPerSample: dataView.getUint16(34, true),
                                subchunk2Id: String.fromCharCode(dataView.getUint8(36)) + String.fromCharCode(dataView.getUint8(37)) + String.fromCharCode(dataView.getUint8(38)) + String.fromCharCode(dataView.getUint8(39)),
                                subchunk2Size: dataView.getUint32(40, true)
                        };

                        setAudioData(header);
                        console.log("🔴: ", header.subchunk1Id);
                };
                reader.readAsArrayBuffer(file);
        }



    }







return (<div className="text-center flex flex-col items-center  h-screen bg-[--black] text-white">


<input type="file" name="file" id="file" accept="audio/wav"   onChange={handleSubmit}/>





{
audioData && <div className="text-[--white] mb-12 p-5 bg-[--grey] lg:px-[30%] ">
  <h2 className="text-center text-[--white] text-2xl py-2 mb-10">
    Result
    </h2>

<div className="grid grid-cols-2 gap-1 text-left bg-slate-300 p-2 rounded-lg">

<p className="bg-gray-600 py-4 pl-3 content-center">Header</p><p className="bg-gray-600 py-4 pl-3 content-center">Value</p>


<p className={rowStyling}>Chunk Id</p><p className={rowStyling}>{audioData.chunkId}</p>
<p className={rowStyling}> Size</p><p className={rowStyling}> {audioData.chunkSize}</p>
<p className={rowStyling}> Format</p><p className={rowStyling}> {audioData.format}</p>

<p className={rowStyling}>Sub Chunk ID</p><p className={rowStyling}> {audioData.subchunk1Id}</p>




<p className={rowStyling}> Audio Format</p><p className={rowStyling}> {audioData.audioFormat}</p>
<p className={rowStyling}> Num Channels</p><p className={rowStyling}> {audioData.numChannels}</p>
<p className={rowStyling}> Sample Rate</p><p className={rowStyling}> {audioData.sampleRate}</p>
<p className={rowStyling}> Byte Rate</p><p className={rowStyling}> BYTE {audioData.byteRate}</p>
<p className={rowStyling}> Block Align</p><p className={rowStyling}> {audioData.blockAlign}</p>
<p className={rowStyling}> Bits  Sample</p><p className={rowStyling}> {audioData.bitsPerSample}</p>
</div>

</div>
}







</div>)};