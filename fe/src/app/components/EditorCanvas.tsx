import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import {
  Type,
  Image as ImageIcon,
  Square,
  Circle,
  Trash2,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Play,
  Save,
  Trash,
  LayoutGrid,
  Layers,
  Database,
  GraduationCap,
  BookOpen,
  Heading1,
  Heading2,
  Heading3,
  List,
  CheckSquare,
  FileText,
  Sparkles,
  Plus,
  ArrowLeft,
  Minus,
  ZoomIn,
} from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";

interface CanvasElement {
  id: string;
  type: "text" | "image" | "shape";
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  textAlign?: string;
  color?: string;
  backgroundColor?: string;
  shapeType?: "rectangle" | "circle";
}

interface EditorCanvasProps {
  isAdmin: boolean;
  onBack?: () => void;
}

const sampleImages = [
  "https://images.unsplash.com/photo-1567057420215-0afa9aa9253a?w=400",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
  "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400",
];

export function EditorCanvas({ isAdmin, onBack }: EditorCanvasProps) {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [draggedElement, setDraggedElement] = useState<string | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [scale, setScale] = useState(1);
  const [canvasTitle, setCanvasTitle] = useState("Giáo trình mới");

  const addText = () => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type: "text",
      content: "Click to edit text",
      x: 100,
      y: 100,
      width: 200,
      height: 50,
      fontSize: 24,
      fontWeight: "normal",
      fontStyle: "normal",
      textDecoration: "none",
      textAlign: "left",
      color: "#000000",
    };
    setElements([...elements, newElement]);
  };

  const addImageFromUrl = (url: string) => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type: "image",
      content: url,
      x: 150,
      y: 150,
      width: 200,
      height: 150,
    };
    setElements([...elements, newElement]);
    setShowImageDialog(false);
  };

  const addShape = (shapeType: "rectangle" | "circle") => {
    const newElement: CanvasElement = {
      id: Date.now().toString(),
      type: "shape",
      content: "",
      x: 120,
      y: 120,
      width: 150,
      height: 150,
      shapeType,
      backgroundColor: "#3b82f6",
    };
    setElements([...elements, newElement]);
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedElement === id) setSelectedElement(null);
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setElements(
      elements.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedElement(id);
    setDraggedElement(id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedElement && isAdmin) {
      const element = elements.find((el) => el.id === draggedElement);
      if (element) {
        updateElement(draggedElement, {
          x: element.x + e.movementX,
          y: element.y + e.movementY,
        });
      }
    }
  };

  const handleMouseUp = () => {
    setDraggedElement(null);
  };

  const saveCanvasAsTemplate = () => {
    console.log("Saving template...", { title: canvasTitle, elements });
    // TODO: Integrate with backend API
  };

  const selectedEl = elements.find((el) => el.id === selectedElement);

  return (
    <div className="flex h-full bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Left Sidebar - Tools */}
      {isAdmin && (
        <div className="w-20 bg-white border-r border-gray-200 flex flex-col py-4 shadow-sm">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6 pb-4 border-b border-gray-200">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg mb-1">
              <GraduationCap className="size-5 text-white" />
            </div>
            <span className="text-[10px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Anawim
            </span>
          </div>
          
          <div className="flex-1 flex flex-col items-center space-y-2 overflow-y-auto">
            <div className="w-full px-2 mb-2">
              <p className="text-[10px] text-gray-500 text-center font-semibold uppercase">Nội dung</p>
            </div>
            
            {/* Heading 1 */}
            <button
              onClick={addText}
              className="flex flex-col items-center justify-center w-16 py-2.5 hover:bg-blue-50 rounded-lg transition-all group relative"
              title="Tiêu đề lớn"
            >
              <Heading1 className="size-5 text-blue-600 mb-1" />
              <span className="text-[10px] text-gray-600">Tiêu đề</span>
            </button>

            {/* Text */}
            <button
              onClick={addText}
              className="flex flex-col items-center justify-center w-16 py-2.5 hover:bg-blue-50 rounded-lg transition-all group"
              title="Văn bản"
            >
              <Type className="size-5 text-gray-700 mb-1" />
              <span className="text-[10px] text-gray-600">Văn bản</span>
            </button>

            {/* Divider */}
            <div className="w-12 h-px bg-gray-200 my-1"></div>
            <div className="w-full px-2 mb-1">
              <p className="text-[10px] text-gray-500 text-center font-semibold uppercase">Media</p>
            </div>

            {/* Image */}
            <button
              onClick={() => setShowImageDialog(true)}
              className="flex flex-col items-center justify-center w-16 py-2.5 hover:bg-purple-50 rounded-lg transition-all group"
              title="Hình ảnh"
            >
              <ImageIcon className="size-5 text-purple-600 mb-1" />
              <span className="text-[10px] text-gray-600">Hình ảnh</span>
            </button>

            {/* Divider */}
            <div className="w-12 h-px bg-gray-200 my-1"></div>
            <div className="w-full px-2 mb-1">
              <p className="text-[10px] text-gray-500 text-center font-semibold uppercase">Hình dạng</p>
            </div>

            {/* Rectangle */}
            <button
              onClick={() => addShape("rectangle")}
              className="flex flex-col items-center justify-center w-16 py-2.5 hover:bg-green-50 rounded-lg transition-all group"
              title="Hình chữ nhật"
            >
              <Square className="size-5 text-green-600 mb-1" />
              <span className="text-[10px] text-gray-600">Hộp</span>
            </button>

            {/* Circle */}
            <button
              onClick={() => addShape("circle")}
              className="flex flex-col items-center justify-center w-16 py-2.5 hover:bg-green-50 rounded-lg transition-all group"
              title="Hình tròn"
            >
              <Circle className="size-5 text-green-600 mb-1" />
              <span className="text-[10px] text-gray-600">Vòng</span>
            </button>

            {/* Divider */}
            <div className="w-12 h-px bg-gray-200 my-1"></div>
            <div className="w-full px-2 mb-1">
              <p className="text-[10px] text-gray-500 text-center font-semibold uppercase">Giáo dục</p>
            </div>

            {/* Quiz */}
            <button
              className="flex flex-col items-center justify-center w-16 py-2.5 hover:bg-amber-50 rounded-lg transition-all group"
              title="Câu hỏi"
            >
              <CheckSquare className="size-5 text-amber-600 mb-1" />
              <span className="text-[10px] text-gray-600">Câu hỏi</span>
            </button>

            {/* List */}
            <button
              className="flex flex-col items-center justify-center w-16 py-2.5 hover:bg-amber-50 rounded-lg transition-all group"
              title="Danh sách"
            >
              <List className="size-5 text-amber-600 mb-1" />
              <span className="text-[10px] text-gray-600">List</span>
            </button>
          </div>
        </div>
      )}

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
          <div className="flex items-center space-x-4">
            {onBack && (
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="size-5" />
              </button>
            )}
            <div className="flex items-center space-x-2">
              <BookOpen className="size-5 text-blue-600" />
              <input
                type="text"
                value={canvasTitle}
                onChange={(e) => setCanvasTitle(e.target.value)}
                className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0 text-gray-800"
                placeholder="Tên giáo trình..."
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Zoom Control */}
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1.5">
              <button
                onClick={() => setScale(Math.max(0.25, scale - 0.25))}
                className="text-gray-600 hover:text-gray-900"
              >
                <Minus className="size-4" />
              </button>
              <span className="text-sm font-medium text-gray-700 w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => setScale(Math.min(2, scale + 0.25))}
                className="text-gray-600 hover:text-gray-900"
              >
                <Plus className="size-4" />
              </button>
            </div>

            {/* Action Buttons */}
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Xem trước
            </button>
            <button
              onClick={saveCanvasAsTemplate}
              className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-sm flex items-center space-x-2"
            >
              <Save className="size-4" />
              <span>Lưu giáo trình</span>
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div
          className="flex-1 bg-gradient-to-br from-gray-50 to-blue-50 overflow-auto relative p-8"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={() => setSelectedElement(null)}
        >
          <div className="max-w-5xl mx-auto">
            <div 
              className="bg-white rounded-xl shadow-xl mx-auto relative border-2 border-gray-200" 
              style={{ width: "900px", height: "600px", position: "relative" }}
            >
              {elements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="border-2 border-dashed border-gray-300 rounded-xl px-16 py-12 bg-gray-50/50">
                      <Sparkles className="size-8 text-blue-400 mx-auto mb-3" />
                      <p className="text-gray-600 text-base font-medium">Bắt đầu tạo giáo trình của bạn</p>
                      <p className="text-gray-500 text-sm mt-1">Chọn các công cụ bên trái để thêm nội dung</p>
                    </div>
                  </div>
                </div>
              )}
              
              {elements.map((element) => (
                <div
                  key={element.id}
                  onMouseDown={(e) => isAdmin && handleMouseDown(e, element.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedElement(element.id);
                  }}
                  style={{
                    position: "absolute",
                    left: element.x,
                    top: element.y,
                    width: element.width,
                    height: element.height,
                    cursor: isAdmin ? "move" : "default",
                    border: selectedElement === element.id ? "2px solid #3b82f6" : "2px solid transparent",
                  }}
                  className="group"
                >
                  {element.type === "text" && (
                    <div
                      contentEditable={isAdmin}
                      suppressContentEditableWarning
                      onBlur={(e) => updateElement(element.id, { content: e.currentTarget.textContent || "" })}
                      style={{
                        fontSize: element.fontSize,
                        fontWeight: element.fontWeight,
                        fontStyle: element.fontStyle,
                        textDecoration: element.textDecoration,
                        textAlign: element.textAlign as any,
                        color: element.color,
                        width: "100%",
                        height: "100%",
                        outline: "none",
                      }}
                    >
                      {element.content}
                    </div>
                  )}
                  {element.type === "image" && (
                    <img src={element.content} alt="" className="w-full h-full object-cover rounded" />
                  )}
                  {element.type === "shape" && (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: element.backgroundColor,
                        borderRadius: element.shapeType === "circle" ? "50%" : "8px",
                      }}
                    />
                  )}
                  {isAdmin && selectedElement === element.id && (
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute -top-3 -right-3 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteElement(element.id);
                      }}
                    >
                      <Trash2 className="size-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Slide Pagination */}
            <div className="flex items-center justify-center mt-6 space-x-3">
              <button className="w-20 h-16 bg-white border-2 border-blue-500 rounded-lg flex items-center justify-center text-sm font-semibold text-blue-600 shadow-sm hover:bg-blue-50 transition-all">
                1
              </button>
              <button className="w-20 h-16 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-sm text-gray-600 hover:border-blue-400 hover:bg-gray-50 transition-all">
                2
              </button>
              <button className="w-20 h-16 bg-white border border-gray-300 rounded-lg flex items-center justify-center text-sm text-gray-600 hover:border-blue-400 hover:bg-gray-50 transition-all">
                3
              </button>
              <button className="w-20 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl text-white hover:from-blue-600 hover:to-purple-700 shadow-md transition-all">
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Properties Panel */}
      {isAdmin && selectedEl && (
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto shadow-lg">
          <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2 pb-4 border-b border-gray-200">
              <Badge className="size-5 text-purple-600" />
              <h3 className="font-semibold text-lg text-gray-800">Thuộc tính</h3>
            </div>

            <Tabs defaultValue="style" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger value="style" className="data-[state=active]:bg-white">
                  Kiểu dáng
                </TabsTrigger>
                <TabsTrigger value="position" className="data-[state=active]:bg-white">
                  Vị trí
                </TabsTrigger>
              </TabsList>

              <TabsContent value="style" className="space-y-5 mt-4">
                {selectedEl.type === "text" && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Cỡ chữ</Label>
                      <Input
                        type="number"
                        value={selectedEl.fontSize}
                        onChange={(e) =>
                          updateElement(selectedEl.id, { fontSize: parseInt(e.target.value) })
                        }
                        className="border-gray-300 focus:border-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Màu chữ</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="color"
                          value={selectedEl.color}
                          onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                          className="w-16 h-10 p-1 cursor-pointer"
                        />
                        <Input
                          type="text"
                          value={selectedEl.color}
                          onChange={(e) => updateElement(selectedEl.id, { color: e.target.value })}
                          className="flex-1 font-mono text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Định dạng</Label>
                      <div className="flex space-x-2">
                        <Button
                          variant={selectedEl.fontWeight === "bold" ? "default" : "outline"}
                          size="icon"
                          onClick={() =>
                            updateElement(selectedEl.id, {
                              fontWeight: selectedEl.fontWeight === "bold" ? "normal" : "bold",
                            })
                          }
                          className="hover:bg-blue-50"
                        >
                          <Bold className="size-4" />
                        </Button>
                        <Button
                          variant={selectedEl.fontStyle === "italic" ? "default" : "outline"}
                          size="icon"
                          onClick={() =>
                            updateElement(selectedEl.id, {
                              fontStyle: selectedEl.fontStyle === "italic" ? "normal" : "italic",
                            })
                          }
                          className="hover:bg-blue-50"
                        >
                          <Italic className="size-4" />
                        </Button>
                        <Button
                          variant={selectedEl.textDecoration === "underline" ? "default" : "outline"}
                          size="icon"
                          onClick={() =>
                            updateElement(selectedEl.id, {
                              textDecoration:
                                selectedEl.textDecoration === "underline" ? "none" : "underline",
                            })
                          }
                          className="hover:bg-blue-50"
                        >
                          <Underline className="size-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Căn chỉnh</Label>
                      <div className="flex space-x-2">
                        <Button
                          variant={selectedEl.textAlign === "left" ? "default" : "outline"}
                          size="icon"
                          onClick={() => updateElement(selectedEl.id, { textAlign: "left" })}
                          className="hover:bg-blue-50"
                        >
                          <AlignLeft className="size-4" />
                        </Button>
                        <Button
                          variant={selectedEl.textAlign === "center" ? "default" : "outline"}
                          size="icon"
                          onClick={() => updateElement(selectedEl.id, { textAlign: "center" })}
                          className="hover:bg-blue-50"
                        >
                          <AlignCenter className="size-4" />
                        </Button>
                        <Button
                          variant={selectedEl.textAlign === "right" ? "default" : "outline"}
                          size="icon"
                          onClick={() => updateElement(selectedEl.id, { textAlign: "right" })}
                          className="hover:bg-blue-50"
                        >
                          <AlignRight className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                )}
                {selectedEl.type === "shape" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Màu nền</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="color"
                        value={selectedEl.backgroundColor}
                        onChange={(e) =>
                          updateElement(selectedEl.id, { backgroundColor: e.target.value })
                        }
                        className="w-16 h-10 p-1 cursor-pointer"
                      />
                      <Input
                        type="text"
                        value={selectedEl.backgroundColor}
                        onChange={(e) =>
                          updateElement(selectedEl.id, { backgroundColor: e.target.value })
                        }
                        className="flex-1 font-mono text-sm"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="position" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>X</Label>
                    <Input
                      type="number"
                      value={selectedEl.x}
                      onChange={(e) => updateElement(selectedEl.id, { x: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Y</Label>
                    <Input
                      type="number"
                      value={selectedEl.y}
                      onChange={(e) => updateElement(selectedEl.id, { y: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rộng</Label>
                    <Input
                      type="number"
                      value={selectedEl.width}
                      onChange={(e) =>
                        updateElement(selectedEl.id, { width: parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cao</Label>
                    <Input
                      type="number"
                      value={selectedEl.height}
                      onChange={(e) =>
                        updateElement(selectedEl.id, { height: parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}

      {/* Image Selection Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Tải lên tệp</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-3">Hình ảnh</h4>
              <div className="grid grid-cols-2 gap-3">
                {sampleImages.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => addImageFromUrl(url)}
                    className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                  >
                    <img src={url} alt={`Sample ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
