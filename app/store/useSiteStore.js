import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSiteStore = create(
  persist(
    (set) => ({
      // Global Settings
      logoText: "BM Pet care",
      
      // Home Page Hero
      heroTitle: "The Ultimate Dog Sleepover!",
      heroSubtitle: "Where every day is a tail-wagging adventure. Boarding, daycare, and playdates designed for your best friend's joy.",
      heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzqeKeX0pUZJeRH-UQoHmLIY1B05fkmDh1PW941ElHkfda3PtDWcCMdj-c-FVB3Q6Qv31hGQOk7eztxwRFVHDRvTm4qprZdG1idK6D97ete9AVnU5vGscchWV7tBZHuEcDzz1-mymugKsGGtXtJQalDLAijYAe8Kp7nZEu-aGQzFG8G3ClKBbrVwmIqdiIqc-aX4Mvy1gJgAl2z7qPtHNmcH_0qdX-3-cymnCcFOI_WLSPcvzAaS_JEfqrfcDvHFMReqfeZZwl2w",
      
      // About Page
      aboutHeroTitle: "Meet The Pack Leaders",
      aboutHeroSubtitle: "We're just a couple of humans who think dogs are better than people. BM Pet care started because we wanted a place where our own pups wouldn't just stay, but actually play. Warning: We might love your dog more than you do.",
      aboutImage1: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiYf-49EmJmtFcBJonfrBIC-uBqPx1VXfUY3w4Vw2TUw_4IF72DIrUJiDSY6qjZva36GIsxYTyS8GdwRTMZVqCQlIS3T6bMJdiWnmrRCeP61OUZw4RyrYBsmACFXqHE8WTeuN0YZ3KcUgtuemRr7kBSAbSJWmjCO9e2RB0EpQdcIUArALvPOM_reNQyk-rN_N6K5FsXomtUE9hO8OSOa8OGtL19z8Vsz1S1xK84kARUBhDzaT98u2e4KU67RhaquqlWjCOAjVYkA",
      aboutImage2: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHT_NyUcDbQdyUbdJJXCbAM4jMfzYE9DvKldhr5QNkfuzbeZ9rLbVCGS_wf5L6YPuxTXtW3_u6gy0Zn65iPmijcRopL84rT3QU6YroAYKF51XH4aG8wnFEcgb04eGPfCvXeL71ffVljdQO01DqF2NP_P6fhsp8-2-zPj3FZiOBmZAainQVTz4zTg_7ExdQIHaqNreXlawGAbMk51tP-EJsf8FjAbe-c_af8ibXUUTfetkztRZYMI8Rorh9dAeSw0V9-ZqUnIukqQ",

      // Services Page
      servicesHeroTitle: "Choose Your Next Big Adventure!",
      servicesHeroSubtitle: "From sleepy cuddles to sudsy bubbles, we've got everything a good boy (or girl) could ever dream of.",
      
      // Action to update any field
      updateField: (field, value) => set({ [field]: value }),
    }),
    {
      name: "bm-pet-care-site-storage",
    }
  )
);
