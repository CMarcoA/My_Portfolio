# Quick Content Editing Guide

## 📍 Where to Edit Each Section

### **Experience Pages**
**File:** `src/pages/experienceData.js`

Edit each experience entry (lines 2-132):
```javascript
{
  id: "hci-research-student",           // Don't change this (used for routing)
  title: "HCI Research Student",        // ← Edit job title
  year: "Summer 2024",                  // ← Edit time period
  headline: "Human-Computer Interaction Lab · University of Manitoba",  // ← Edit company/location
  about: [                               // ← Edit description paragraphs
    "Your description here...",
  ],
  learned: [                             // ← Edit what you learned (bullet points)
    "First thing you learned...",
    "Second thing...",
  ],
  contributions: [                       // ← Edit your achievements (bullet points)
    "First achievement...",
    "Second achievement...",
  ],
  media: [                               // ← Edit images (see below)
    {
      src: "/media/img1.jpg",
      placeholder: "/media/img1.jpg",
      alt: "Image description",
      caption: "Caption text",
    },
  ],
}
```

### **Projects Pages**
**File:** `src/pages/projectsData.js`

Same structure as Experience. Edit:
- `title` - Project name
- `year` - Year or time period
- `headline` - Project type/location
- `about` - Description
- `learned` - Skills/lessons learned
- `contributions` - Features/achievements

### **Hobbies Pages**
**File:** `src/pages/hobbiesData.js`

Same structure as Experience. Edit:
- `title` - Hobby name
- `year` - "Ongoing" or time period
- `headline` - Category/type
- `about` - Description
- `learned` - Skills/lessons learned
- `contributions` - Achievements/projects

### **About Me Section**
**File:** `src/components/main/InfoPanel.jsx`

Edit lines 32-54:
- **Name:** Line 34 - `headingLines: ["Claudius Marco", "Andrew"]`
- **Bio:** Line 35-37 - `paragraphs: [...]`
- **Focus:** Line 38-40 - `bullets: [...]`
- **Skills:** Lines 43-51 - `logos: [...]` array (add/remove skills)

---

## 🖼️ Editing Images

In any data file, edit the `media` array:
```javascript
media: [
  {
    src: "/media/your-image.jpg",           // ← Change image path
    placeholder: "/media/img1.jpg",          // ← Fallback image
    alt: "Description of image",             // ← Edit alt text
    caption: "Caption shown below image",    // ← Edit caption
  },
]
```

**Image paths:**
- Use `/media/...` format (with leading slash)
- Put images in `public/media/` folder
- Example: `/media/photography.jpg`

---

## ✏️ Quick Tips

1. **Arrays use square brackets** `[]` and commas
2. **Strings use double quotes** `"`
3. **Don't change `id` fields** (used for routing)
4. **Each bullet point is a separate array item**
5. **Save the file** after editing

---

## 📂 File Locations Summary

| Section | File to Edit |
|---------|-------------|
| Experience | `src/pages/experienceData.js` |
| Projects | `src/pages/projectsData.js` |
| Hobbies | `src/pages/hobbiesData.js` |
| About Me | `src/components/main/InfoPanel.jsx` |

---

That's it! Just find the entry you want to edit and change the text content.

