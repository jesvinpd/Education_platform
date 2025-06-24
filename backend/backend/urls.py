from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Notes Backend API")

urlpatterns = [
    path('', home),  # Root URL view
    path('admin/', admin.site.urls),
    path('api/', include('notes.urls')),  # Your app's URLs
]

# Serving media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
