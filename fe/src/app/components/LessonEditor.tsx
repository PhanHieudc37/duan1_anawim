import { useState } from "react";
import { Button } from "./ui/button";
import {
  Play,
  Save,
  Trash,
  LayoutGrid,
  Type,
  Image as ImageIcon,
  Layers,
  Network,
} from "lucide-react";

interface LessonEditorProps {
  onBack?: () => void;
}

export function LessonEditor({ onBack }: LessonEditorProps) {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar - Tools */}
      <div className="w-20 bg-white border-r border-gray-200 flex flex-col py-4">
        <div className="flex-1 flex flex-col items-center space-y-6">
          {/* Nội dung */}
          <button
            onClick={() => setIsEditing(true)}
            className="flex flex-col items-center justify-center w-16 py-3 hover:bg-blue-50 rounded-lg transition-all group"
            title="Nội dung"
          >
            <div className="bg-gray-300 p-3 rounded-lg mb-2">
              <LayoutGrid className="size-6 text-white" />
            </div>
            <span className="text-xs text-gray-700">Nội dung</span>
          </button>

          {/* Cốt */}
          <button
            className="flex flex-col items-center justify-center w-16 py-3 hover:bg-blue-50 rounded-lg transition-all group"
            title="Cốt"
          >
            <div className="p-3 rounded-lg mb-2">
              <LayoutGrid className="size-6 text-gray-700" />
            </div>
            <span className="text-xs text-gray-700">Cốt</span>
          </button>

          {/* Tiêu đề */}
          <button
            className="flex flex-col items-center justify-center w-16 py-3 hover:bg-blue-50 rounded-lg transition-all group"
            title="Tiêu đề"
          >
            <Type className="size-6 text-gray-700 mb-2" />
            <span className="text-xs text-gray-700">Tiêu đề</span>
          </button>

          {/* Ảnh */}
          <button
            className="flex flex-col items-center justify-center w-16 py-3 hover:bg-blue-50 rounded-lg transition-all group"
            title="Ảnh"
          >
            <ImageIcon className="size-6 text-gray-700 mb-2" />
            <span className="text-xs text-gray-700">Ảnh</span>
          </button>

          {/* Sắp xếp */}
          <button
            className="flex flex-col items-center justify-center w-16 py-3 hover:bg-blue-50 rounded-lg transition-all group"
            title="Sắp xếp"
          >
            <Layers className="size-6 text-gray-700 mb-2" />
            <span className="text-xs text-gray-700">Sắp xếp</span>
          </button>

          {/* Sắp xếp (2) */}
          <button
            className="flex flex-col items-center justify-center w-16 py-3 hover:bg-blue-50 rounded-lg transition-all group"
            title="Sắp xếp"
          >
            <Layers className="size-6 text-gray-700 mb-2" />
            <span className="text-xs text-gray-700">Sắp xếp</span>
          </button>

          {/* Cấu trúc từ */}
          <button
            className="flex flex-col items-center justify-center w-16 py-3 hover:bg-blue-50 rounded-lg transition-all group"
            title="Cấu trúc từ"
          >
            <Network className="size-6 text-gray-700 mb-2" />
            <span className="text-xs text-gray-700">Cấu trúc từ</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">Anawim English</h1>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Play className="size-4" />
              <span>Play</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Save className="size-4" />
              <span>Save</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 text-red-600 hover:text-red-700"
            >
              <Trash className="size-4" />
              <span>Delete</span>
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-50 p-8 flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <div className="bg-gray-300 rounded-2xl p-12 min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-400">
              {isEditing ? (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full min-h-[350px] bg-transparent border-none outline-none text-gray-700 text-lg resize-none"
                  placeholder="Nhập nội dung của bạn tại đây"
                  autoFocus
                />
              ) : (
                <p className="text-gray-600 text-base">Nhập nội dung của bạn tại đây</p>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-center mt-6 space-x-4">
              <button className="w-20 h-16 bg-gray-300 rounded-lg flex items-center justify-center text-base font-semibold text-gray-700 hover:bg-gray-400 transition-all">
                1
              </button>
              <button className="w-20 h-16 bg-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-400 transition-all">
                <span className="text-2xl text-gray-700">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
