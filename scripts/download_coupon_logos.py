import os
from urllib.request import urlretrieve
from urllib.error import URLError, HTTPError

base = os.path.join(os.path.dirname(__file__), '..', 'altftoolweb', 'src', 'app', 'random-slug-generator', 'components', 'coupons', 'assets')
urls = {
    'amazon.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773381281318/amazon-logo.jpg',
    'myntra.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1774444164712/myntra-logo.jpg',
    'airindia.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237387408/airindia-logo.jpg',
    'dell.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237431657/dell-logo.jpg',
    'ajio.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237388178/ajio-logo.jpg',
    'uber.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237619521/uber-logo.jpg',
    'makemytrip.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237508369/makemytrip-1-logo.jpg',
    'udemy.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237620165/udemy-logo.jpg',
    'samsung.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237572786/samsung-logo.jpg',
    'nykaa.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237535375/nykaa-logo.jpg',
    'hp-shopping.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237472675/hpshopping-logo.jpg',
    'adidas.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237385257/adidas-logo.jpg',
    'nike.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237531284/nike-logo.jpg',
    'oneplus.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773381307325/oneplus-logo.jpg',
    'flipkart.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773826357590/flipkart-logo.jpg',
    'godaddy.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237461389/godaddy-logo.jpg',
    'namecheap.png': 'https://workfromfun.com/wp-content/uploads/2017/03/namecheap-1.png',
    'mamaearth.jpg': 'https://i.pinimg.com/originals/d7/08/7e/d7087e7c5909da949c3ad78b12fd4f98.jpg',
    'wow-skin.webp': 'https://trackingstatus.in/wp-content/uploads/2025/02/Wow-Skin-Science-Order-Tracking.webp',
    'puma.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237559673/puma-logo.jpg',
    'boat.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237407989/boat-logo.jpg',
    'noise.jpg': 'https://vectorseek.com/wp-content/uploads/2023/06/Noise-Logo-Vector-600x600.jpg',
    'urbanic.jpg': 'https://tse2.mm.bing.net/th/id/OIP.KEU3_QNn03H4rXPAlFSgTQAAAA?r=0&cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    'tatacliq.jpg': 'https://tse1.mm.bing.net/th/id/OIP.Evu-eF-ns6pf-o1IMEis2QHaFj?r=0&cb=thfc1falcon&w=600&h=450&rs=1&pid=ImgDetMain&o=7&rm=3',
    'jiomart.png': 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/ea/75/29/ea752946-2c1f-9892-1f7a-abc524166c11/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1200x630wa.png',
    'pharmeasy.jpg': 'https://tse1.mm.bing.net/th/id/OIP.l3OXeAQxW5AMjH2q9J6PxAHaEH?r=0&cb=thfc1falcon&rs=1&pid=ImgDetMain&o=7&rm=3',
    'netmeds.jpg': 'https://thf.bing.com/th/id/OIP.Yd5S82P4w48XOf41ZTpTNwHaDt?r=0&o=7&cb=thfc1falconrm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    '1mg.png': 'https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/a1/58/c1/a158c170-32d7-64aa-3e00-0cd96a6fb8c1/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/246x0w.webp',
    'croma.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237427820/croma-logo.jpg',
    'asus.jpg': 'https://static.vecteezy.com/system/resources/previews/014/414/662/original/asus-logo-on-transparent-background-free-vector.jpg',
    'lenovo.jpg': 'https://thf.bing.com/th/id/OIP.K7xP4eUdDEZBvDNFNsYgbgHaEK?r=0&o=7&cb=thfc1falconrm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    'lenskart.png': 'https://pnggallery.com/wp-content/uploads/lenskart-logo-01.png',
    'muscleblaze.jpg': 'https://cdn.grabon.in/gograbon/images/merchant/1773237523413/muscleblaze-logo.jpg',
    'fastrack.jpg': 'https://leobags.in/wp-content/uploads/2021/07/Fastrack_Logo-2-980x613.jpg',
}

os.makedirs(base, exist_ok=True)
for fname, url in urls.items():
    path = os.path.join(base, fname)
    print('Downloading', fname)
    try:
        urlretrieve(url, path)
        print('  saved', path)
    except (HTTPError, URLError, Exception) as exc:
        print('  failed', fname, exc)
