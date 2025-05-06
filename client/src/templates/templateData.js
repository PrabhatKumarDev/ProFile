import { Component } from "lucide-react";
import TemplateOne from "./TemplateOne";
import TemplateTwo from "./TemplateTwo";
import TemplateThree from "./TemplateThree";

export const templates = [
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Clean and minimalist design that puts your work front and center',    
        thumbnail: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        component: TemplateOne,
    },

      {
        id: 'professional',
        name: 'Professional',
        description: 'A traditional layout perfect for job seekers and professionals',
        thumbnail: 'https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        component: TemplateTwo,
    },
      {
        id: 'creative',
        name: 'Creative',
        description: 'Bold and artistic design to showcase creative talents',
        thumbnail: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        component: TemplateThree,
    },
];