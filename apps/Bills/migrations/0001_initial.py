# Generated by Django 3.2.16 on 2023-05-12 21:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Sponsors', '0001_initial'),
        ('suscriptionTypes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bills',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_paid', models.BooleanField()),
                ('pdf', models.TextField()),
                ('CIF_sponsor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Sponsors.sponsors')),
                ('suscription', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='suscriptionTypes.suscriptiontypes')),
            ],
            options={
                'db_table': 'Bills',
            },
        ),
    ]
