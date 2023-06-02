from django.db import models

class suscriptionTypes(models.Model):
    class Meta:
        verbose_name = 'suscriptionTypes'
        verbose_name_plural = 'suscriptionTypes'

    # columnas
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.FloatField()
    footer = models.BooleanField(default=False)
    productScreen = models.BooleanField(default=False)


    def __str__(self):
        return self.name
