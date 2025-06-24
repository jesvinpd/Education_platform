from django.db import models

from django.db import models

class Note(models.Model):
    title = models.CharField(max_length=255)
    semester = models.IntegerField()
    subject = models.CharField(max_length=100)
    file = models.FileField(upload_to='notes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

