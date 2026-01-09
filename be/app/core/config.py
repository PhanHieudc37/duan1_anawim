from pydantic_settings import BaseSettings
from typing import List, Union


class Settings(BaseSettings):
    """Cấu hình ứng dụng"""
    
    # Database
    DATABASE_URL: str = "sqlite:///./anawim.db"
    
    # Security
    SECRET_KEY: str = "anawim-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS - can be string or list
    ALLOWED_ORIGINS: Union[str, List[str]] = "http://localhost:5173,http://localhost:3000"
    
    # App Info
    APP_NAME: str = "Anawim English Teaching Platform"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    class Config:
        env_file = ".env"
        case_sensitive = True
    
    def get_cors_origins(self) -> List[str]:
        """Get CORS origins as list"""
        if isinstance(self.ALLOWED_ORIGINS, str):
            return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(',')]
        return self.ALLOWED_ORIGINS


settings = Settings()
