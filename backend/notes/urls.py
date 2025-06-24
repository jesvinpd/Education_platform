from django.urls import path
from .views import NoteListCreate, NoteDetail, NoteBySemesterSubject

urlpatterns = [
    path('notes/', NoteListCreate.as_view(), name='note-list-create'),
    path('notes/<int:pk>/', NoteDetail.as_view(), name='note-detail'),
    path('notes/filter/<int:semester>/<str:subject>/', NoteBySemesterSubject.as_view(), name='notes-by-sem-sub'),
]
