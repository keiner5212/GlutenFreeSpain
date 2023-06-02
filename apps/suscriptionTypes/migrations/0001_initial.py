# Generated by Django 3.2.16 on 2023-05-12 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='suscriptionTypes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('price', models.FloatField()),
            ],
            options={
                'verbose_name': 'suscriptionTypes',
                'verbose_name_plural': 'suscriptionTypes',
            },
        ),
    ]
