from django.contrib import admin
from .models import *
# Register your models here.
@admin.register(Post)
class postadmin(admin.ModelAdmin):
   list_display=['id','title','author','publish','updated','status'] 
   list_editable=['status']
   prepopulated_fields={'slug':('title',)}
   list_filter=['title','author','status']
   ordering=['status','publish']
   raw_id_fields=['author']
   show_facets=admin.ShowFacets.ALWAYS

admin.site.register(User)
