#!/usr/bin/env python3
"""
Script per rimuovere lo sfondo dal logo e renderlo trasparente
"""
from PIL import Image
import sys

# Carica l'immagine
input_path = 'public/assets/SVG_PNG/logo-wordmark-black.png'
output_path = 'public/assets/SVG_PNG/logo-wordmark-black-transparent.png'

try:
    img = Image.open(input_path)
    print(f"Immagine caricata: {img.size}, mode: {img.mode}")
    
    # Converti in RGBA se non lo è già
    img = img.convert("RGBA")
    
    # Ottieni i dati dei pixel
    datas = img.getdata()
    
    # Crea una nuova lista di pixel
    new_data = []
    for item in datas:
        # Cambia tutti i pixel bianchi/grigi chiari in trasparente
        # item è (R, G, B, A)
        r, g, b, a = item
        
        # Se il pixel è bianco o grigio molto chiaro (sfondo), rendilo trasparente
        if r > 240 and g > 240 and b > 240:
            new_data.append((255, 255, 255, 0))  # Trasparente
        else:
            new_data.append(item)  # Mantieni il pixel originale
    
    # Applica i nuovi dati
    img.putdata(new_data)
    
    # Salva l'immagine
    img.save(output_path, "PNG")
    print(f"✅ Immagine salvata con sfondo trasparente: {output_path}")
    
except Exception as e:
    print(f"❌ Errore: {e}")
    sys.exit(1)













