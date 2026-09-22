import os
import urllib.request
import json
from PIL import Image

PEXELS_KEY = os.environ.get("PEXELS_API_KEY")
if not PEXELS_KEY:
    raise RuntimeError("Set PEXELS_API_KEY before fetching images.")

# Ensure output directories exist
for sub in ["market", "customers", "sellers", "entrepreneurs", "suppliers"]:
    os.makedirs(f"public/images/{sub}", exist_ok=True)

# Remove any previous reference-cropped images
old_crops = [
    "public/images/market/hero-market.jpg",
    "public/images/market/hero-market-ref.jpg",
    "public/images/customers/customer-problem.jpg",
    "public/images/sellers/seller-problem.jpg",
    "public/images/entrepreneurs/entrepreneur-problem.jpg"
]
for f in old_crops:
    if os.path.exists(f):
        os.remove(f)
        print(f"Removed reference crop: {f}")

# Photography requirements mapping
targets = [
    {
        "id": "hero",
        "query": "Indian market street shops customers",
        "out": "public/images/market/hero-local-market.webp",
        "orientation": "landscape",
        "photo_index": 0 # Swastik Arora - bustling street shop in India with customers
    },
    {
        "id": "problem_customers",
        "query": "local grocery store customer shopping",
        "out": "public/images/customers/customer-local-shopping.webp",
        "orientation": "landscape",
        "photo_index": 0
    },
    {
        "id": "problem_sellers",
        "query": "Indian grocery store owner shopkeeper",
        "out": "public/images/sellers/seller-inventory.webp",
        "orientation": "landscape",
        "photo_index": 0
    },
    {
        "id": "entrepreneurs",
        "query": "Indian small business shop owner",
        "out": "public/images/entrepreneurs/entrepreneur-local-business.webp",
        "orientation": "landscape",
        "photo_index": 0
    },
    {
        "id": "suppliers",
        "query": "wholesale market warehouse goods distribution",
        "out": "public/images/suppliers/supplier-wholesale.webp",
        "orientation": "landscape",
        "photo_index": 0
    },
    {
        "id": "local_market",
        "query": "Indian street bazaar neighborhood shops",
        "out": "public/images/market/hyperlocal-market.webp",
        "orientation": "landscape",
        "photo_index": 1
    },
    {
        "id": "product_demand",
        "query": "customer inspecting product grocery shelf",
        "out": "public/images/customers/product-discovery-demand.webp",
        "orientation": "landscape",
        "photo_index": 0
    },
    {
        "id": "business_opportunity",
        "query": "small retail shop owner organizing merchandise",
        "out": "public/images/entrepreneurs/business-opportunity-planning.webp",
        "orientation": "landscape",
        "photo_index": 0
    }
]

def search_pexels(query, orientation="landscape"):
    encoded = urllib.parse.quote(query)
    url = f"https://api.pexels.com/v1/search?query={encoded}&per_page=6&orientation={orientation}"
    req = urllib.request.Request(url, headers={"Authorization": PEXELS_KEY, "User-Agent": "Antigravity/1.0"})
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        return data.get("photos", [])

temp_dir = "public/images/temp"
os.makedirs(temp_dir, exist_ok=True)

manifest = []

for item in targets:
    print(f"\nSearching for: {item['id']} ('{item['query']}')...")
    photos = search_pexels(item["query"], item["orientation"])
    if not photos:
        print(f"No photos found for {item['query']}")
        continue
    
    selected = photos[min(item["photo_index"], len(photos) - 1)]
    img_url = selected["src"]["large2x"] if "large2x" in selected["src"] else selected["src"]["large"]
    
    print(f"Selected Photo ID {selected['id']} by {selected['photographer']}")
    print(f"Alt: {selected.get('alt')}")
    print(f"Downloading from {img_url}...")
    
    temp_file = os.path.join(temp_dir, f"{item['id']}.jpg")
    req = urllib.request.Request(img_url, headers={"User-Agent": "Antigravity/1.0"})
    with urllib.request.urlopen(req) as resp, open(temp_file, "wb") as out_f:
        out_f.write(resp.read())
        
    # Convert and optimize to WebP with PIL
    img = Image.open(temp_file).convert("RGB")
    # Resize if extremely large to save bandwidth while keeping crisp resolution
    max_w = 1600
    if img.size[0] > max_w:
        ratio = max_w / img.size[0]
        img = img.resize((max_w, int(img.size[1] * ratio)), Image.Resampling.LANCZOS)
        
    img.save(item["out"], "WEBP", quality=88)
    print(f"Saved optimized WebP: {item['out']} ({img.size[0]}x{img.size[1]})")
    
    manifest.append({
        "target": item["out"],
        "id": selected["id"],
        "photographer": selected["photographer"],
        "photographer_url": selected["photographer_url"],
        "alt": selected.get("alt", ""),
        "dimensions": f"{img.size[0]}x{img.size[1]}"
    })

# Save photo attribution manifest
with open("public/images/attributions.json", "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

print("\nAll photographic assets fetched and saved successfully.")
