import { Incident } from '../types/incident';

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics in product recommendations, leading to unfair treatment of minority groups. Initial investigation shows the training data was skewed towards dominant demographic patterns, requiring a comprehensive audit and retraining with balanced datasets.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information that could have led to dangerous situations if followed. The model confidently stated incorrect emergency protocols for a chemical spill scenario, highlighting the need for more rigorous fact-checking and knowledge grounding mechanisms.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata during conversation. While no personal identifiable information was revealed, system logs and session IDs were visible in certain edge case interactions, which could provide attackers with information about system architecture.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  },
  {
    id: 4,
    title: "Automated Content Moderation Failure",
    description: "AI content filter failed to detect harmful content in multiple languages, allowing policy-violating material to remain on the platform for 3.5 hours before manual intervention. Investigation showed the model performs inconsistently across different languages and cultural contexts.",
    severity: "High",
    reported_at: "2025-03-25T11:45:00Z"
  },
  {
    id: 5,
    title: "Anomalous Resource Consumption",
    description: "AI system exhibited unexpected compute resource consumption patterns, using 300% more GPU time than normal operational parameters. No malicious behavior detected, but revealed a potential inefficiency in the optimization algorithm that could be exploited.",
    severity: "Medium",
    reported_at: "2025-03-18T08:30:00Z"
  }
];