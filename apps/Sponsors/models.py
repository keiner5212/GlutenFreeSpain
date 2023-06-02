from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_delete
from django.utils import timezone
import os


def rename_icon(instance, filename):
    ext = os.path.splitext(filename)[1]
    timestamp = timezone.now().strftime("%Y%m%d%H%M%S")
    new_filename = f"{instance.CIF}_{timestamp}{ext}"
    return os.path.join("SponsorImg/", new_filename)


class Sponsors(models.Model):
    CIF = models.TextField(primary_key=True)
    name = models.CharField(max_length=255)
    icon = models.ImageField(upload_to=rename_icon)
    email = models.EmailField()

    class Meta:
        db_table = 'Sponsors'


@receiver(pre_delete, sender=Sponsors)
def delete_image(sender, instance, **kwargs):
    if instance.icon:
        file_path = instance.icon.path
        if os.path.exists(file_path):
            os.remove(file_path)
