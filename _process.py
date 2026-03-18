import re

# ── project-bible.html ──
with open('project-bible.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remover bloco <style>...</style>
content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)

# Adicionar links CSS depois do <title>
content = content.replace(
    '<title>Mar de Cinzas \u2014 Project Bible v6.0</title>',
    '<title>Mar de Cinzas \u2014 Project Bible v6.0</title>\n<link rel="stylesheet" href="css/style.css">\n<link rel="stylesheet" href="css/bible.css">'
)

# Extrair links da nav antiga
old_nav_match = re.search(r'<nav>(.*?)</nav>', content, flags=re.DOTALL)
if old_nav_match:
    section_links = re.findall(r'<a href="(#[^"]+)">([^<]+)</a>', old_nav_match.group(1))
    bible_nav_links = '\n  '.join(['<a href="{}">{}</a>'.format(h, t) for h, t in section_links])
    new_nav = (
        '<nav class="site-nav">\n'
        '  <div class="nav-inner">\n'
        '    <a href="index.html" class="nav-brand">Mar de Cinzas</a>\n'
        '    <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false">\n'
        '      <span></span><span></span><span></span>\n'
        '    </button>\n'
        '    <div class="nav-links" id="site-nav-links">\n'
        '      <a href="index.html">In\u00edcio</a>\n'
        '      <a href="capitulos/">Cap\u00edtulos</a>\n'
        '      <a href="project-bible.html" class="active">Project Bible</a>\n'
        '    </div>\n'
        '  </div>\n'
        '</nav>\n'
        '<nav class="bible-nav">\n'
        '  ' + bible_nav_links + '\n'
        '</nav>'
    )
    content = content[:old_nav_match.start()] + new_nav + content[old_nav_match.end():]

# Adicionar script antes de </body>
content = content.replace('</body>', '<script src="js/main.js"></script>\n</body>')

with open('project-bible.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('project-bible.html OK -', len(content), 'chars')

# ── capitulos/capitulo1.html ──
with open('capitulos/capitulo1.html', 'r', encoding='utf-8') as f:
    cap = f.read()

# Remover bloco <style>...</style>
cap = re.sub(r'<style>.*?</style>', '', cap, flags=re.DOTALL)

# Remover <link> do google fonts (agora em style.css)
cap = re.sub(r'<link href="https://fonts\.googleapis\.com[^"]*" rel="stylesheet">\s*', '', cap)

# Adicionar links CSS depois do <title>
cap = cap.replace(
    '<title>Mar de Cinzas \u2014 Cap\u00edtulo 1</title>',
    '<title>Mar de Cinzas \u2014 Cap\u00edtulo 1: O Come\u00e7o do Fim</title>\n<link rel="stylesheet" href="../css/style.css">\n<link rel="stylesheet" href="../css/chapter.css">'
)

# Adicionar nav depois de <body>
new_chapter_nav = (
    '\n<nav class="site-nav">\n'
    '  <div class="nav-inner">\n'
    '    <a href="../index.html" class="nav-brand">Mar de Cinzas</a>\n'
    '    <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false">\n'
    '      <span></span><span></span><span></span>\n'
    '    </button>\n'
    '    <div class="nav-links" id="site-nav-links">\n'
    '      <a href="../index.html">In\u00edcio</a>\n'
    '      <a href="../capitulos/" class="active">Cap\u00edtulos</a>\n'
    '      <a href="../project-bible.html">Project Bible</a>\n'
    '    </div>\n'
    '  </div>\n'
    '</nav>\n'
)
cap = cap.replace('<body>\n<div class="page">', '<body>' + new_chapter_nav + '<div class="page">')

# Adicionar navegação entre capítulos antes do fim da .page
nav_between = (
    '\n<nav class="chapter-nav">\n'
    '  <span class="disabled">&larr; Cap\u00edtulo anterior</span>\n'
    '  <a href="../capitulos/">Ver todos</a>\n'
    '  <span class="disabled">Pr\u00f3ximo cap\u00edtulo &rarr;</span>\n'
    '</nav>\n'
)
cap = cap.replace('</div>\n</body>', nav_between + '</div>\n<script src="../js/main.js"></script>\n</body>')

with open('capitulos/capitulo1.html', 'w', encoding='utf-8') as f:
    f.write(cap)

print('capitulos/capitulo1.html OK -', len(cap), 'chars')
