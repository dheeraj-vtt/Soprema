import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineFileUpload } from "react-icons/md";
import { FiDownload, FiEyeOff } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const FileDispay = () => {
  const fileInputRef = useRef(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".dwg, .dxf",
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
    },
  });

  const [layers, setLayers] = useState([
    { id: 1, name: "Wall", visible: true },
    { id: 2, name: "Doors", visible: false },
    { id: 3, name: "Windows", visible: true },
    { id: 4, name: "Furniture", visible: false },
    { id: 5, name: "Electrical", visible: true },
  ]);

  const toggleVisibility = (id) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Uploaded file:", file);
    }
  };

  return (
    <div className="pt-8 pb-12 px-5 bg-gray-300 w-full">
      <div>
        <div className="p-3 text-white bg-blue-400 font-semibold">
          CAD file display
        </div>
      </div>
      <div className="h-[400px] bg-white">
        <div className="w-full h-full flex items-center justify-center">
          <div
            {...getRootProps()}
            className="h-[180px] w-[400px] flex flex-col items-center justify-center text-center cursor-pointer"
            style={{
              border: "3px dotted rgba(107, 114, 128, 0.7)",
              borderStyle: "dotted",
              borderRadius: "8px",
              backgroundClip: "padding-box",
              borderSpacing: "20px",
            }}
          >
            <input {...getInputProps()} />
            <MdOutlineFileUpload size={48} className="text-gray-400" />
            <p className="text-gray-400 mt-1 text-[14px] font-semibold">
              Drop your DWG or DXF file here or click to upload
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center py-3 px-5 mt-5 bg-white rounded-xl">
        {/* Upload File Button */}
        <button
          onClick={handleFileUploadClick}
          className="flex items-center space-x-2 bg-white text-blue-600 border py-2 px-3 rounded-lg"
        >
          <MdOutlineFileUpload size={20} />
          <span className="text-[14px] font-bold">Upload File</span>
        </button>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".dwg,.dxf"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex gap-5">
          {/* Export DXF Button */}
          <button className="flex items-center space-x-2 bg-gray-500 text-white py-2 px-3 rounded-lg">
            <FiDownload size={16} />
            <span className="text-[14px] font-bold">Export DXF</span>
          </button>

          {/* Export CSV Button */}
          <button className="flex items-center space-x-2 bg-gray-500 text-white py-2 px-3 rounded-lg">
            <FaFileAlt size={16} />
            <span className="text-[14px] font-bold">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Layers Section */}
      <div className="mt-5">
        <div className="w-full bg-gray-500 text-[14px] font-bold text-white py-3 px-4 rounded-t-md">
          Layers
        </div>
        <div className="bg-white py-4 px-4 rounded-b-md">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className="flex justify-between items-center py-2"
            >
              {/* Layer Name and Icon */}
              <div className="flex items-center space-x-3">
                {layer.visible ? (
                  <IoEyeOutline size={16} className="text-blue-600" />
                ) : (
                  <FiEyeOff size={16} className="text-gray-400" />
                )}
                <span className="text-[14px] font-medium">{layer.name}</span>
              </div>

              {/* Toggle Switch */}
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={layer.visible}
                  onChange={() => toggleVisibility(layer.id)}
                />
                <div className="w-10 h-5 bg-gray-900 rounded-full flex-shrink-0 relative transition-colors duration-200 ease-in-out">
                  <span
                    className={`absolute top-0.5 left-0.5 h-4 w-4 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      layer.visible ? "translate-x-5" : ""
                    }`}
                  ></span>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileDispay;
