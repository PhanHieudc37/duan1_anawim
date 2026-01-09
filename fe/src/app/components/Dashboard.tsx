import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import {
  GraduationCap,
  LogOut,
  Plus,
  Search,
  FileText,
  Eye,
  Edit,
  Trash2,
  Crown,
  User as UserIcon,
  BookOpen,
  Library,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Badge } from "./ui/badge";

interface DashboardProps {
  userEmail: string;
  isAdmin: boolean;
  onLogout: () => void;
  onOpenEditor: () => void;
}

interface Slide {
  id: string;
  title: string;
  thumbnail: string;
  updatedAt: string;
  author: string;
}

export function Dashboard({ userEmail, isAdmin, onLogout, onOpenEditor }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data
  const slides: Slide[] = [
    {
      id: "1",
      title: "English Grammar - Present Tense",
      thumbnail: "https://images.unsplash.com/photo-1567057420215-0afa9aa9253a?w=400",
      updatedAt: "2 giờ trước",
      author: "admin@anawim.com",
    },
    {
      id: "2",
      title: "Vocabulary: Animals",
      thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
      updatedAt: "5 giờ trước",
      author: "teacher@anawim.com",
    },
    {
      id: "3",
      title: "Reading Comprehension Basics",
      thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
      updatedAt: "1 ngày trước",
      author: "admin@anawim.com",
    },
  ];

  const filteredSlides = slides.filter((slide) =>
    slide.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                  <GraduationCap className="size-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Anawim
                  </h1>
                  <p className="text-xs text-gray-500">English Teaching Platform</p>
                </div>
              </div>
              <Badge variant={isAdmin ? "default" : "secondary"} className="ml-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                {isAdmin ? (
                  <>
                    <Crown className="size-3 mr-1" />
                    Admin
                  </>
                ) : (
                  <>
                    <UserIcon className="size-3 mr-1" />
                    Teacher
                  </>
                )}
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden md:block">{userEmail}</span>
              <Button variant="outline" size="sm" onClick={onLogout} className="border-gray-300 hover:bg-gray-100">
                <LogOut className="size-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Chào mừng đến với Anawim! 👋
              </h2>
              <p className="text-blue-100 text-lg">
                {isAdmin 
                  ? "Quản lý và tạo giáo trình chuyên nghiệp cho trung tâm tiếng Anh" 
                  : "Soạn giáo trình dễ dàng, nhanh chóng và sáng tạo"}
              </p>
            </div>
            <div className="hidden lg:flex space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center min-w-[120px]">
                <Library className="size-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">{filteredSlides.length}</p>
                <p className="text-sm text-blue-100">Giáo trình</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center min-w-[120px]">
                <Sparkles className="size-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">Pro</p>
                <p className="text-sm text-blue-100">Templates</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Action Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">
              {isAdmin ? "Tất cả giáo trình" : "Giáo trình của bạn"}
            </h3>
            <p className="text-gray-500">Tìm kiếm và quản lý giáo trình của bạn</p>
          </div>

          <Button
            onClick={onOpenEditor}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            <Plus className="size-5 mr-2" />
            Tạo giáo trình mới
          </Button>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm giáo trình (Grammar, Vocabulary, Reading...)"
              className="pl-12 h-14 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-xl shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Slides Grid */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSlides.map((slide) => (
              <Card key={slide.id} className="group hover:shadow-xl transition-all border-gray-200 overflow-hidden hover:-translate-y-1 bg-white">
                <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                  <img
                    src={slide.thumbnail}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-white/90 text-gray-700 border-0 shadow-sm">
                      <BookOpen className="size-3 mr-1" />
                      Lesson
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-white text-gray-900 hover:bg-gray-100"
                        onClick={onOpenEditor}
                      >
                        <Eye className="size-4 mr-1" />
                        Xem
                      </Button>
                      {isAdmin && (
                        <Button
                          size="sm"
                          className="bg-blue-600 text-white hover:bg-blue-700"
                          onClick={onOpenEditor}
                        >
                          <Edit className="size-4 mr-1" />
                          Sửa
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <CardHeader className="p-5">
                  <CardTitle className="text-base font-semibold text-gray-900 line-clamp-2 mb-2">
                    {slide.title}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{slide.updatedAt}</span>
                    <Badge variant="outline" className="text-xs">
                      {slide.author === "admin@anawim.com" ? "Admin" : "Teacher"}
                    </Badge>
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          {filteredSlides.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-300">
              <div className="max-w-sm mx-auto">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="size-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Không tìm thấy giáo trình
                </h3>
                <p className="text-gray-500 mb-6">
                  Thử tìm kiếm với từ khóa khác hoặc tạo giáo trình mới
                </p>
                <Button
                  onClick={onOpenEditor}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Plus className="size-4 mr-2" />
                  Tạo giáo trình đầu tiên
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <GraduationCap className="size-5 text-white" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Anawim</p>
                <p className="text-xs text-gray-500">English Teaching Platform</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 Anawim. Nền tảng soạn giáo trình chuyên nghiệp.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}