from django.http import HttpResponse
from django.template.loader import get_template
from django.template import Context
from xhtml2pdf import pisa
import os

def render_to_pdf(template_path, context_dict={}):
    # Obtener la ruta absoluta al archivo de plantilla
    template = get_template(template_path)
    template_path = os.path.abspath(template.template.name)

    # Renderizar el contenido de la plantilla
    html = template.render(context_dict)
    
    # Crear la respuesta PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="recibo.pdf"'

    # Crear el PDF utilizando xhtml2pdf
    pisa_status = pisa.CreatePDF(html, dest=response)
    if pisa_status.err:
        return HttpResponse('Error al generar el PDF', status=500)
    
    return response