import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-open',
  templateUrl: './blog-open.component.html',
  styleUrl: './blog-open.component.css'
})
export class BlogOpenComponent {
  
  // This data would typically come from an API
  blogData = {
    title: "Anupans often work synergistically with the medicine",
    subtitle: "As you incorporate these aspects into your dinchaniya (daily routine)",
    date: "18 June 2025",
    tags: ["Yoga", "Health Concerns"],
    heroImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    keyNotes: [
      "Ayurveda is a natural healing system from India focusing on balance.",
      "It's based on three doshas: Vata, Pitta, and Kapha.",
      "Uses herbs, diet, detox, and lifestyle to maintain health.",
      "Promotes mental peace through yoga, meditation, and routine."
    ],
    tableOfContents: [
      "Foundations of Ayurveda",
      "Ayurvedic Healing Methods",
      "Mind-Body Harmony"
    ],
    authors: [
      {
        name: "Dr. Malhotra",
        role: "Ayurveda Practitioner",
        avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        name: "Dr. Malhotra",
        role: "Ayurveda Naturopathics",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      }
    ],
    content: [
      {
        heading: "Anupans often work",
        text: "As you incorporate these aspects into your dinchaniya (daily routine), you'll notice delightful changes—improved digestion, natural detoxification, enhanced mental clarity, and restful sleep. As your body regains its equilibrium, it becomes empowered to maximise the remedy and anupan. The essence of Ayurveda lies in its holistic approach to a life of balance, vitality, and well-being. Remember, no medicine can substitute a healthy dinchaniya."
      },
      {
        heading: "Anupans often work",
        text: "As you incorporate these aspects into your dinchaniya (daily routine), you'll notice delightful changes—improved digestion, natural detoxification, enhanced mental clarity, and restful sleep. As your body regains its equilibrium, it becomes empowered to maximise the benefits from the remedy and anupan."
      },
      {
        heading: "Anupans often work",
        text: "As you incorporate these aspects into your dinchaniya (daily routine), you'll notice delightful changes—improved digestion, natural detoxification, enhanced mental clarity, and restful sleep."
      }
    ],
    categories: ["Yoga", "Health Concerns"]
  };

  // Method to submit comment (would integrate with API)
  onSubmitComment(commentData: any) {
    console.log('Comment submitted:', commentData);
    // Here you would typically send the data to your API
  }
}