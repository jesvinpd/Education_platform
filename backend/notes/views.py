from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import FileResponse
import os
from .models import Note
from .serializers import NoteSerializer

class NoteListCreateView(generics.ListCreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class NoteBySemesterSubjectView(generics.ListAPIView):
    serializer_class = NoteSerializer
    
    def get_queryset(self):
        semester = self.kwargs['semester']
        subject = self.kwargs['subject']
        return Note.objects.filter(semester=semester, subject=subject)

class NoteDownloadView(APIView):
    def get(self, request, pk):
        try:
            note = Note.objects.get(pk=pk)
            file_path = note.file.path
            
            if os.path.exists(file_path):
                file = open(file_path, 'rb')
                response = FileResponse(file)
                response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
                return response
            return Response({"error": "File not found"}, status=404)
            
        except Note.DoesNotExist:
            return Response({"error": "Note not found"}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)