from django.db import models

# Create your models here.


class Users(models.Model):
    class Meta:
        db_table = 'Users'

    # columnas
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    birth_date = models.DateField()

    def __str__(self):
        return self.name

    def check_password(self, raw_password):
        return self.password == raw_password.strip()
