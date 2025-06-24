from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Note
from .serializers import NoteSerializer

class NoteListCreate(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    parser_classes = [MultiPartParser, FormParser]  # Enable file upload

class NoteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteBySemesterSubject(generics.ListAPIView):
    serializer_class = NoteSerializer

    def get_queryset(self):
        semester = self.kwargs['semester']
        subject = self.kwargs['subject']
        return Note.objects.filter(semester=semester, subject=subject)
