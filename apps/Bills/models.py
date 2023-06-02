from django.db import models
from ..Sponsors.models import Sponsors
from ..suscriptionTypes.models import suscriptionTypes


class Bills(models.Model):
    is_paid = models.BooleanField()
    CIF_sponsor = models.ForeignKey(Sponsors, on_delete=models.CASCADE)
    suscription = models.ForeignKey(suscriptionTypes, on_delete=models.CASCADE)
    subscription_date = models.DateField(default=None)
    expiration_date = models.DateField(default=None)

    class Meta:
        db_table = 'Bills'
