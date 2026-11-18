#!/usr/bin/env python3
"""MI Development: build the curated construction portfolio without changing originals."""
import argparse, hashlib, html, json, re, subprocess
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--inventory', action='store_true', help='List source image candidates in cue and numeric order, without publishing them')
parser.add_argument('--source', default='/Volumes/PHILIPS/Architecture/construction projects')
args = parser.parse_args()
source = Path(args.source)
projects = json.loads((ROOT/'construction/projects.json').read_text())
esc = html.escape

def priority(name):
    stem = Path(name).stem.lower()
    if any(cue in stem for cue in ('hero', 'put first', 'cover')): return (0, 0, stem)
    n = re.match(r'^(\d+)(?:\D|$)', stem)
    return (1, int(n[1]), stem) if n else (2, 0, stem)

if args.inventory:
    for folder in sorted(source.iterdir()):
        if folder.is_dir():
            print(folder.name)
            for candidate in sorted((f for f in folder.iterdir() if f.suffix.lower() in ('.jpg', '.jpeg', '.png', '.webp')), key=lambda f: priority(f.name)):
                print('  ' + candidate.name)
    raise SystemExit(0)

slugs = [p['slug'] for p in projects]
if len(slugs) != len(set(slugs)):
    raise ValueError('Each project must have a unique slug')
for p in projects:
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', p['slug']) or not p['images']:
        raise ValueError('Use a lowercase URL slug and select at least one photograph')
    for image in p['images']:
        original = (source / image.get('folder', p['folder']) / image['file']).resolve()
        if not original.is_relative_to(source.resolve()) or not original.is_file():
            raise ValueError(f'Missing or invalid source photograph: {original}')
        if not image['caption'].strip():
            raise ValueError('Each photograph needs a factual caption')

def prepare(job):
    project, photo = job
    original = source/photo.get('folder', project['folder'])/photo['file']
    digest = hashlib.sha256(original.read_bytes()).hexdigest()[:12]
    folder = ROOT/'multimedia/construction'/photo.get('asset_slug', project['slug']); folder.mkdir(parents=True, exist_ok=True)
    photo['assets'] = []
    for width in (640, 1600):
        dest = folder/f'{digest}-{width}.webp'
        if not dest.exists():
            subprocess.run(['magick',str(original),'-auto-orient','-resize',f'{width}x{width}>','-strip','-quality','84',str(dest)],check=True)
        photo['assets'].append(dest.relative_to(ROOT).as_posix())
    dimensions = subprocess.check_output(['magick','identify','-format','%w %h',str(ROOT/photo['assets'][1])],text=True)
    photo['width'],photo['height'] = map(int, dimensions.split())
    photo['small_width'] = int(subprocess.check_output(['magick','identify','-format','%w',str(ROOT/photo['assets'][0])], text=True))

with ThreadPoolExecutor(max_workers=4) as pool:
    list(pool.map(prepare,[(p,i) for p in projects for i in p['images']]))

def photo(p, prefix='', eager=False, sizes='(max-width: 700px) 100vw, 65vw'):
    a,b = [prefix+x for x in p['assets']]
    small_width = p['small_width']
    sources = f'{a} {small_width}w, {b} {p["width"]}w' if small_width < p['width'] else f'{b} {p["width"]}w'
    return f'<img src="{b}" srcset="{sources}" sizes="{sizes}" width="{p["width"]}" height="{p["height"]}" alt="{esc(p["caption"])}" loading="{"eager" if eager else "lazy"}" decoding="async"'+(' fetchpriority="high"' if eager else '')+'>'

def shell(title,description,body,prefix=''):
    nav=''.join(f'<li><a href="{prefix}{url}"'+(' aria-current="page"' if label=='Construction' else '')+f'>{label}</a></li>' for url,label in [('home.html','Home'),('development.html','Development'),('construction.html','Construction'),('services.html','Services'),('portfolio.html','Portfolio'),('our-story.html','Our Story'),('contact.html','Contact')])
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{esc(title)} | MI Architects</title><meta name="description" content="{esc(description)}"><link rel="icon" href="{prefix}favicon.svg"><link rel="stylesheet" href="{prefix}construction.css"><link rel="stylesheet" href="{prefix}site-navigation.css"><link rel="stylesheet" href="{prefix}site-atmosphere.css"><script defer src="{prefix}site-atmosphere.js"></script><script defer src="{prefix}site-navigation.js"></script><script defer src="{prefix}construction.js"></script></head>
<body class="construction-page"><a class="c-skip" href="#main">Skip to content</a><header class="c-header"><a class="c-brand" href="{prefix}home.html">MI ARCHITECTS<span>Architecture · Construction</span></a><nav aria-label="Main navigation"><ul>{nav}</ul></nav></header><main id="main">{body}</main><footer class="c-footer"><a href="{prefix}contact.html">Let’s build something lasting <span aria-hidden="true">↗</span></a><p>MI Architects / MI Development <span>© 2026</span></p></footer></body></html>'''

cards=[]
for n,p in enumerate(projects):
    cover=p['images'][0]
    cards.append(f'''<article class="c-project c-reveal"><a href="construction/{p['slug']}.html" class="c-project-link"><div class="c-photo">{photo(cover,sizes='(max-width: 700px) 92vw, 60vw')}<span class="c-view">Explore project ↗</span></div><div class="c-project-meta"><span class="c-index">{n+1:02}</span><div><h2>{esc(p['title'])}</h2><p>{esc(p['subtitle'])}</p></div><span aria-hidden="true">↗</span></div></a></article>''')
# First project remains first; the numbered lead image retains its portrait composition.
lead=projects[0]
body=f'''<section class="c-intro"><div class="c-intro-copy"><p class="c-eyebrow">MI Development / Construction</p><h1><span class="c-hero-vision">Vision.</span><br><span class="c-hero-material">Material.</span><br><em class="c-hero-built">Built.</em></h1><p class="c-intro-text">Architecture taking shape.<br>From the ground to the finest detail.</p><a class="c-text-link" href="#projects">Explore the works <span aria-hidden="true">↓</span></a></div><a class="c-intro-image c-photo" href="construction/{lead['slug']}.html">{photo(lead['images'][0],eager=True,sizes='(max-width: 700px) 100vw, 60vw')}<span class="c-hero-caption">01 / {esc(lead['title'])} ↗</span></a></section><section id="projects" class="c-works"><div class="c-section-label"><h2>Selected works</h2><span>{len(projects):02} projects & studies</span></div><div class="c-projects">{''.join(cards)}</div></section>'''
(ROOT/'construction.html').write_text(shell('Construction','Construction by MI Architects and MI Development. Explore site photography, material craftsmanship and architecture taking shape.',body))
for n,p in enumerate(projects):
    figures=[]
    for i,im in enumerate(p['images']):
        figures.append(f'''<figure class="c-gallery-item c-reveal {'c-portrait' if im['height']>im['width'] else ''}"><button class="c-photo c-gallery-open" data-full="../{im['assets'][1]}" data-caption="{esc(im['caption'],quote=True)}" aria-label="Enlarge: {esc(im['caption'],quote=True)}">{photo(im,'../',eager=i==0)}<span class="c-view" aria-hidden="true">View full image ↗</span></button><figcaption><span>{i+1:02}</span>{esc(im['caption'])}</figcaption></figure>''')
    nxt=projects[(n+1)%len(projects)]
    description = f'<p class="c-project-description">{esc(p["description"])}</p>' if p.get('description') else ''
    body=f'''<section class="c-project-heading"><a class="c-text-link" href="../construction.html#projects">← All construction</a><p class="c-eyebrow">{esc(p['subtitle'])}</p><h1>{esc(p['title'])}</h1><p class="c-count">{len(p['images']):02} images / {'Design study' if p['slug']=='nidri-study' else 'Construction journal'}</p>{description}</section><div class="c-gallery">{''.join(figures)}</div><a class="c-next" href="{nxt['slug']}.html"><span>Next project</span><strong>{esc(nxt['title'])}</strong><span aria-hidden="true">↗</span></a><dialog class="c-lightbox" aria-label="Image gallery"><button class="c-lightbox-close" aria-label="Close gallery">✕</button><button class="c-lightbox-prev" aria-label="Previous image">←</button><figure><img alt=""><figcaption aria-live="polite"></figcaption></figure><button class="c-lightbox-next" aria-label="Next image">→</button></dialog>'''
    (ROOT/'construction'/f'{p["slug"]}.html').write_text(shell(p['title'],p['title']+' — '+p['subtitle']+'. A photographic journal by MI Architects.',body,'../'))
for project in projects:
    for alias in project.get('aliases', []):
        if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', alias):
            raise ValueError('Invalid project alias')
        target = project['slug'] + '.html'
        (ROOT/'construction'/f'{alias}.html').write_text(f'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url={target}"><link rel="canonical" href="https://www.miarchitects.gr/construction/{target}"><title>{esc(project["title"])} | MI Architects</title></head><body><a href="{target}">Explore {esc(project["title"])}</a></body></html>')
print(f'Built {len(projects)} projects / {sum(len(p["images"]) for p in projects)} curated photographs. Originals unchanged.')
