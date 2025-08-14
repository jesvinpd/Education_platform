from django.urls import path
from notes.views import (  # Changed from .views to notes.views
    NoteListCreateView,
    NoteDetailView,
    NoteDownloadView,
    NoteBySemesterSubjectView
)

urlpatterns = [
    path('notes/', NoteListCreateView.as_view(), name='note-list-create'),
    path('notes/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
    path('notes/download/<int:pk>/', NoteDownloadView.as_view(), name='note-download'),
    path('notes/filter/<int:semester>/<str:subject>/', 
         NoteBySemesterSubjectView.as_view(), 
         name='notes-by-sem-sub'),
]