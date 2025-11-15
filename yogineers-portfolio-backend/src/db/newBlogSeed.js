const db = require('../config/db');

// Helper function to calculate reading time (average 200 words per minute)
const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
};

// Helper function to count words
const countWords = (content) => {
    return content.split(/\s+/).filter(word => word.length > 0).length;
};

// Helper function to clean content
const cleanContent = (content) => {
    return content
        .replace(/^\s+|\s+$/g, '') // Trim whitespace from start and end
        .replace(/\n\s*\n/g, '\n\n') // Replace multiple newlines with double newlines
        .replace(/\t/g, '') // Remove tab characters
        .replace(/\r/g, '') // Remove carriage returns
        .trim(); // Final trim
};

// Helper function to generate slug
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim('-');
};

const sampleBlogs = [
    {
        title: "The Future of Artificial Intelligence: Transforming Industries in 2025",
        subtitle: "How AI is revolutionizing healthcare, finance, and education with breakthrough innovations",
        content: `Introduction

Artificial Intelligence has moved beyond science fiction into our daily reality. In 2025, we're witnessing unprecedented advancements that are reshaping entire industries and redefining how we work, learn, and live.

AI in Healthcare: Saving Lives Through Technology

The healthcare sector has embraced AI with remarkable results. Machine learning algorithms can now detect cancer earlier than human radiologists, with accuracy rates exceeding 95%. AI-powered drug discovery is reducing the time to bring life-saving medications to market from decades to just a few years.

Personalized medicine is becoming a reality through AI analysis of genetic data, lifestyle factors, and medical history. Patients receive treatment plans tailored specifically to their unique biological makeup, dramatically improving outcomes.

Financial Revolution: AI-Powered Banking

The financial industry has undergone a complete transformation. AI algorithms process millions of transactions in real-time, detecting fraud with unprecedented accuracy while enabling instant, secure payments across the globe.

Robo-advisors now manage portfolios worth trillions of dollars, making sophisticated investment strategies accessible to everyone. Credit scoring has become more inclusive, using alternative data sources to assess creditworthiness fairly.

Education Reimagined

AI tutors provide personalized learning experiences, adapting to each student's pace and learning style. Language barriers are dissolving as real-time translation enables global classroom collaboration.

Virtual reality combined with AI creates immersive educational experiences, allowing students to walk through ancient Rome or explore the molecular structure of DNA.

Challenges and Ethical Considerations

With great power comes great responsibility. As AI becomes more prevalent, we must address concerns about privacy, job displacement, and algorithmic bias. Establishing ethical guidelines and regulatory frameworks is crucial for ensuring AI benefits all of humanity.

Conclusion

The AI revolution is just beginning. As we navigate this transformative period, the key is to remain adaptable, embrace continuous learning, and work together to harness AI's potential for the greater good.`,
        excerpt: "Exploring how AI is revolutionizing healthcare, finance, and education in 2025, while addressing the challenges and opportunities that lie ahead.",
        author_name: "Dr. Sarah Chen",
        category: "Technology",
        tags: JSON.stringify(["artificial intelligence", "machine learning", "healthcare", "finance", "education", "future tech"]),
        meta_title: "AI Revolution 2025: How Artificial Intelligence is Transforming Industries",
        meta_description: "Discover how artificial intelligence is revolutionizing healthcare, finance, and education in 2025. Explore the latest AI innovations and their impact on society.",
        is_featured: true,
        status: "published"
    },
    {
        title: "Sustainable Web Development: Building for a Greener Internet",
        subtitle: "Practical strategies to reduce your website's carbon footprint and create environmentally conscious digital experiences",
        content: `The Hidden Environmental Cost of the Internet

Did you know that the internet is responsible for approximately 4% of global greenhouse gas emissions? Every website visit, every video stream, and every cloud computation contributes to our carbon footprint. As developers, we have the power and responsibility to build a more sustainable web.

Understanding Digital Carbon Footprint

A website's carbon footprint comes from three main sources:

• Data Centers: Servers that host and serve your content
• Network Infrastructure: The cables, routers, and cell towers that transmit data
• End-User Devices: The phones, tablets, and computers that access your site

Optimization Strategies for Sustainable Development

1. Efficient Code and Minimal Dependencies

Write clean, efficient code that executes faster and requires less processing power. Audit your dependencies regularly and remove unused libraries. Every kilobyte matters when multiplied by millions of users.

2. Image and Media Optimization

Images often account for 60-70% of a page's weight. Use next-generation formats like WebP and AVIF, implement lazy loading, and serve responsive images. Consider whether that high-resolution hero image is really necessary.

3. Green Hosting Solutions

Choose hosting providers powered by renewable energy. Many companies now offer carbon-neutral or carbon-negative hosting options. Your hosting choice can dramatically impact your site's environmental footprint.

4. Content Delivery Networks (CDNs)

CDNs reduce the distance data travels, decreasing energy consumption. Modern CDNs also offer intelligent caching and compression, further reducing bandwidth usage.

Measuring Your Impact

Tools like Website Carbon Calculator and EcoPing help measure your site's carbon footprint. Regular monitoring ensures your sustainability efforts are making a real difference.

The Business Case for Green Development

Sustainable websites aren't just environmentally responsible—they're faster, more efficient, and provide better user experiences. This leads to improved SEO rankings, higher conversion rates, and reduced hosting costs.

Building for the Future

As developers, we're shaping the digital world's future. By prioritizing sustainability, we can create an internet that serves humanity without compromising our planet's health.`,
        excerpt: "Learn how to reduce your website's environmental impact through sustainable development practices, from code optimization to green hosting solutions.",
        author_name: "Alex Rivera",
        category: "Web Development",
        tags: JSON.stringify(["sustainability", "web development", "green tech", "performance", "environment", "carbon footprint"]),
        meta_title: "Sustainable Web Development: Building a Greener Internet",
        meta_description: "Discover practical strategies to reduce your website's carbon footprint and create environmentally conscious digital experiences that benefit both users and the planet.",
        is_featured: false,
        status: "published"
    },
    {
        title: "The Psychology of User Experience: How to Design for Human Behavior",
        subtitle: "Understanding cognitive biases and psychological principles to create more intuitive and engaging digital experiences",
        content: `Introduction: The Mind Behind the Click

Every interaction with a digital interface is a psychological event. Understanding how the human mind processes information, makes decisions, and forms habits is crucial for creating exceptional user experiences.

Cognitive Load Theory in UX Design

The human brain has limited processing capacity. Cognitive load theory explains why simple, intuitive designs outperform complex ones. When users feel overwhelmed, they abandon tasks, leading to poor conversion rates and user satisfaction.

Reducing Cognitive Load:

• Use familiar patterns and conventions
• Minimize the number of choices (Hick's Law)
• Group related information together
• Provide clear visual hierarchy

The Power of Psychology in Design

1. The Serial Position Effect

Users remember the first and last items in a series best. Place your most important navigation items at the beginning and end of menus, and your most crucial information at the top and bottom of pages.

2. The Von Restorff Effect (Isolation Effect)

Items that stand out are more likely to be remembered. Use this principle to highlight call-to-action buttons, important warnings, or key features that differentiate your product.

3. The Peak-End Rule

People judge experiences based on their peak moment and how they ended. Design memorable peak moments in your user journey and ensure positive endings to interactions.

Designing for Different Mental Models

Users approach interfaces with preconceived notions based on their past experiences. Successful designs either leverage existing mental models or carefully guide users toward new ones.

Consider how users from different cultural backgrounds, age groups, and technical skill levels might interpret your design differently. Inclusive design isn't just about accessibility—it's about understanding diverse psychological perspectives.

The Role of Emotions in UX

Emotion drives decision-making more than logic. Design elements that evoke positive emotions—color, typography, imagery, and microinteractions—create stronger connections with users.

Building Emotional Connections:

• Use color psychology strategically
• Craft microcopy with personality
• Design delightful microinteractions
• Create a sense of progress and achievement

Habit Formation and Behavioral Design

The most successful digital products become habits. Understanding the habit loop—cue, routine, reward—helps designers create engaging, sticky experiences without being manipulative.

Testing and Validation

Psychology provides the framework, but user testing validates our assumptions. Combine behavioral insights with real user feedback to create truly effective designs.

Conclusion

Great UX design isn't just about making things look good—it's about understanding the human mind and designing experiences that feel natural, intuitive, and delightful. By applying psychological principles, we can create digital experiences that truly resonate with users.`,
        excerpt: "Discover how psychological principles and cognitive biases influence user behavior, and learn to apply these insights to create more intuitive and engaging digital experiences.",
        author_name: "Dr. Maria Gonzalez",
        category: "UX Design",
        tags: JSON.stringify(["user experience", "psychology", "cognitive bias", "design thinking", "human behavior", "UI/UX"]),
        meta_title: "Psychology of UX: Designing for Human Behavior and Cognition",
        meta_description: "Learn how to apply psychological principles and understand cognitive biases to create more intuitive, engaging digital experiences that resonate with users.",
        is_featured: true,
        status: "published"
    },
    {
        title: "Cybersecurity in the Remote Work Era: Protecting Your Digital Assets",
        subtitle: "Essential security strategies and best practices for organizations navigating the challenges of distributed workforces",
        content: `The New Security Landscape

The rapid shift to remote work has fundamentally changed cybersecurity requirements. Traditional perimeter-based security models are obsolete when employees access company resources from home offices, coffee shops, and co-working spaces around the world.

Understanding Modern Threat Vectors

1. Phishing and Social Engineering

Cybercriminals have adapted their tactics for remote workers. Sophisticated phishing campaigns now target video conferencing credentials, exploit home network vulnerabilities, and use COVID-19 and work-from-home themes to bypass security awareness.

2. Unsecured Home Networks

Home Wi-Fi networks often lack enterprise-grade security. Default router passwords, outdated firmware, and shared networks create entry points for attackers to access corporate data.

3. Cloud Misconfigurations

As organizations rapidly migrate to cloud services, misconfigured settings and inadequate access controls expose sensitive data. The shared responsibility model requires both cloud providers and customers to implement proper security measures.

Building a Zero Trust Security Model

Zero Trust assumes no user or device is inherently trustworthy, regardless of location. This model verifies every access request and continuously monitors for suspicious behavior.

Core Zero Trust Principles:

• Verify explicitly: Authenticate and authorize based on all available data points
• Use least privilege access: Limit user access to what's necessary for their role
• Assume breach: Minimize blast radius and segment access

Essential Security Technologies

1. Multi-Factor Authentication (MFA)

MFA is no longer optional—it's essential. Even if passwords are compromised, additional authentication factors prevent unauthorized access. Consider hardware tokens for high-privilege accounts.

2. Virtual Private Networks (VPNs)

VPNs encrypt traffic between remote workers and corporate networks. Modern solutions offer split tunneling, allowing users to access both corporate resources and internet services efficiently.

3. Endpoint Detection and Response (EDR)

EDR solutions monitor endpoint activities, detect suspicious behavior, and respond to threats in real-time. They're crucial for protecting devices outside the corporate firewall.

Human-Centered Security

Technology alone isn't enough. Security awareness training must evolve for remote work realities. Regular simulated phishing exercises, security briefings, and clear incident reporting procedures keep security top-of-mind.

Creating a Security-Conscious Culture:

• Regular security training tailored to remote work scenarios
• Clear, accessible security policies
• Incident response procedures for remote workers
• Reward systems for security-conscious behavior

Preparing for the Future

Cybersecurity isn't a destination—it's an ongoing journey. As remote work becomes permanent for many organizations, security strategies must evolve continuously to address emerging threats and technologies.

Conclusion

Securing a distributed workforce requires a fundamental shift in thinking. By embracing Zero Trust principles, implementing modern security technologies, and fostering a security-conscious culture, organizations can protect their digital assets while enabling productive remote work.`,
        excerpt: "Explore essential cybersecurity strategies for remote work environments, from Zero Trust implementation to creating security-conscious organizational cultures.",
        author_name: "Michael Thompson",
        category: "Cybersecurity",
        tags: JSON.stringify(["cybersecurity", "remote work", "zero trust", "threat protection", "information security", "data protection"]),
        meta_title: "Remote Work Cybersecurity: Protecting Digital Assets in Distributed Teams",
        meta_description: "Learn essential cybersecurity strategies and best practices for protecting your organization's digital assets in the remote work era.",
        is_featured: false,
        status: "published"
    },
    {
        title: "The Art of Code Review: Building Better Software Through Collaboration",
        subtitle: "Transform your development process with effective code review practices that improve code quality and team collaboration",
        content: `Introduction: More Than Just Bug Catching

Code reviews are often viewed as a necessary evil—a gatekeeping process that slows down development. However, when done effectively, code reviews become powerful tools for knowledge sharing, mentorship, and building robust, maintainable software.

The True Value of Code Reviews

1. Knowledge Transfer

Code reviews facilitate organic knowledge sharing across the team. Junior developers learn from senior colleagues, while senior developers stay informed about different parts of the codebase.

2. Collective Code Ownership

When multiple team members review code, the entire team becomes familiar with different components. This reduces the risk of knowledge silos and makes the codebase more maintainable.

3. Quality Assurance

Multiple pairs of eyes catch bugs, security vulnerabilities, and design issues that automated tools might miss. Reviews also ensure code follows established patterns and conventions.

Best Practices for Effective Reviews

For Authors:

• Keep changes small: Smaller pull requests are easier to review and lead to better feedback
• Write descriptive commit messages: Help reviewers understand the context and reasoning
• Self-review first: Catch obvious issues before requesting reviews
• Provide context: Include relevant background information and testing instructions

For Reviewers:

• Focus on the important stuff: Prioritize logic, security, and architecture over style preferences
• Be constructive: Explain why changes are needed and suggest alternatives
• Ask questions: Use reviews as learning opportunities
• Acknowledge good work: Positive feedback motivates and reinforces good practices

Common Pitfalls and How to Avoid Them

1. Nitpicking Style Issues

Automate style enforcement with tools like Prettier, ESLint, or black. This frees up review time for meaningful discussions about logic and architecture.

2. Overly Large Pull Requests

Large PRs overwhelm reviewers and receive superficial reviews. Break complex features into smaller, logical chunks that tell a story.

3. Ego and Defensiveness

Create a culture where feedback is viewed as improvement opportunities, not personal attacks. Lead by example—be receptive to feedback on your own code.

Tools and Techniques

Automated Checks

Implement continuous integration pipelines that run tests, security scans, and code quality checks before human review. This ensures reviewers focus on logic rather than catching basic issues.

Review Templates

Provide checklists or templates to help reviewers remember important aspects: security implications, performance considerations, test coverage, and documentation updates.

Pair Programming as Review

Sometimes, real-time collaboration through pair programming can be more effective than asynchronous reviews, especially for complex problems or when mentoring junior developers.

Measuring Success

Track metrics like review turnaround time, number of bugs found in production, and team satisfaction with the review process. Use these insights to continuously improve your practices.

Building a Review Culture

The most effective teams view code reviews as collaborative discussions rather than approval processes. Foster an environment where asking questions is encouraged and learning from mistakes is celebrated.

Conclusion

Effective code reviews are investments in your team's collective knowledge and your product's long-term quality. By focusing on collaboration, learning, and continuous improvement, code reviews become a cornerstone of successful software development.`,
        excerpt: "Master the art of code review to improve software quality, facilitate knowledge sharing, and build stronger development teams through effective collaboration practices.",
        author_name: "Jennifer Park",
        category: "Software Development",
        tags: JSON.stringify(["code review", "software development", "team collaboration", "code quality", "best practices", "programming"]),
        meta_title: "Effective Code Review: Building Better Software Through Collaboration",
        meta_description: "Learn how to transform your code review process into a powerful tool for knowledge sharing, mentorship, and building robust, maintainable software.",
        is_featured: false,
        status: "published"
    },
    {
        title: "Data Science Ethics: Navigating Bias, Privacy, and Responsibility in AI",
        subtitle: "Addressing the ethical challenges of data science and machine learning in an increasingly data-driven world",
        content: `Introduction: The Ethical Imperative

As data science and artificial intelligence reshape industries and societies, the ethical implications of our work have never been more critical. Every algorithm we build, every model we deploy, and every insight we generate has the potential to impact millions of lives.

Understanding Algorithmic Bias

Bias in AI systems isn't just a technical problem—it's a reflection of historical inequalities and systemic prejudices embedded in our data and processes.

Sources of Bias:

• Historical bias: Data reflects past discrimination and inequality
• Representation bias: Certain groups are underrepresented in training data
• Measurement bias: Different groups are measured differently
• Confirmation bias: Researchers unconsciously favor results that confirm their hypotheses

Real-World Impact of Biased Systems

Biased algorithms have led to discriminatory outcomes in criminal justice, hiring, lending, and healthcare. These systems can perpetuate and amplify existing inequalities, making fair and representative data science crucial for social justice.

Case Studies:

Facial Recognition: Systems that work poorly for darker skin tones have led to wrongful arrests and surveillance concerns.

Hiring Algorithms: AI recruiting tools have shown bias against women and minorities, reflecting historical hiring patterns.

Credit Scoring: Machine learning models have been found to discriminate against protected classes in loan approvals.

Privacy in the Age of Big Data

The collection and use of personal data raise fundamental questions about privacy, consent, and individual autonomy.

Key Privacy Principles:

• Purpose limitation: Data should only be used for stated purposes
• Data minimization: Collect only what's necessary
• Transparency: Individuals should understand how their data is used
• Control: People should have agency over their personal information

Techniques for Ethical Data Science

1. Bias Detection and Mitigation

Regular auditing for bias across different demographic groups is essential. Techniques include statistical parity testing, equalized odds evaluation, and counterfactual fairness analysis.

2. Privacy-Preserving Methods

Differential privacy, federated learning, and homomorphic encryption allow analysis while protecting individual privacy. These techniques enable insights without exposing personal information.

3. Explainable AI

Black box models may perpetuate bias without detection. Explainable AI techniques help understand model decisions and identify potential bias or errors.

Building Ethical Teams and Processes

Diverse Teams

Diverse perspectives help identify blind spots and challenge assumptions. Teams should include members from different backgrounds, disciplines, and affected communities.

Ethical Review Processes

Establish formal processes for ethical review of data science projects. Consider potential harms, stakeholder impacts, and long-term consequences before deployment.

Continuous Monitoring

Ethical considerations don't end at deployment. Continuously monitor models for bias drift, changing societal norms, and unintended consequences.

Regulatory Landscape

Regulations like GDPR, CCPA, and emerging AI governance frameworks shape how we collect, process, and use data. Stay informed about evolving requirements and best practices.

The Path Forward

Ethical data science isn't about limiting innovation—it's about ensuring that our technological advances benefit everyone. By building fairness, transparency, and accountability into our processes, we can create AI systems that serve humanity's best interests.

Conclusion

As data scientists, we have the power to shape the future through our work. With that power comes the responsibility to consider the ethical implications of our decisions and strive for fairness, privacy, and transparency in everything we build.`,
        excerpt: "Explore the critical ethical considerations in data science and AI, from addressing algorithmic bias to protecting privacy and building responsible AI systems.",
        author_name: "Dr. Aisha Patel",
        category: "Data Science",
        tags: JSON.stringify(["data science", "ethics", "AI bias", "privacy", "algorithmic fairness", "responsible AI", "machine learning"]),
        meta_title: "Data Science Ethics: Addressing Bias, Privacy, and Responsibility in AI",
        meta_description: "Navigate the ethical challenges of data science and machine learning, addressing bias, privacy concerns, and building responsible AI systems for a better future.",
        is_featured: true,
        status: "published"
    }
];

async function seedNewBlogs() {
    try {
        console.log('Starting to seed newblog table...');
        
        // Clear existing data (optional - remove this if you want to keep existing blogs)
        console.log('Clearing existing blog data...');
        await db.query('DELETE FROM newblog');
        
        // Reset auto-increment counter
        await db.query('ALTER TABLE newblog AUTO_INCREMENT = 1');
        
        console.log('Inserting sample blogs...');
        
        for (let i = 0; i < sampleBlogs.length; i++) {
            const blog = sampleBlogs[i];
            
            // Generate slug
            const slug = generateSlug(blog.title);
            
            // Clean content to remove unwanted characters
            const cleanedContent = cleanContent(blog.content);
            
            // Calculate reading time and word count
            const reading_time = calculateReadingTime(cleanedContent);
            const word_count = countWords(cleanedContent);
            
            // Insert blog into database
            const query = `
                INSERT INTO newblog (
                    title, subtitle, slug, content, excerpt, author_name,
                    reading_time, word_count, status, category, tags,
                    meta_title, meta_description, is_featured,
                    published_at, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), NOW())
            `;
            
            const [result] = await db.query(query, [
                blog.title,
                blog.subtitle,
                slug,
                cleanedContent,
                blog.excerpt,
                blog.author_name,
                reading_time,
                word_count,
                blog.status,
                blog.category,
                blog.tags,
                blog.meta_title,
                blog.meta_description,
                blog.is_featured
            ]);
            
            console.log(`✅ Inserted blog ${i + 1}: "${blog.title}" (ID: ${result.insertId})`);
        }
        
        console.log('\n🎉 Successfully seeded newblog table with 6 sample blogs!');
        console.log('\nBlog summaries:');
        console.log('1. AI Revolution 2025 (Featured) - Technology');
        console.log('2. Sustainable Web Development - Web Development');
        console.log('3. Psychology of UX Design (Featured) - UX Design');
        console.log('4. Cybersecurity in Remote Work - Cybersecurity');
        console.log('5. The Art of Code Review - Software Development');
        console.log('6. Data Science Ethics (Featured) - Data Science');
        
    } catch (error) {
        console.error('❌ Error seeding newblog table:', error);
        throw error;
    }
}

// Export the seed function
module.exports = { seedNewBlogs };

// Run the seed function if this file is executed directly
if (require.main === module) {
    seedNewBlogs()
        .then(() => {
            console.log('\n✅ Seeding completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n❌ Seeding failed:', error);
            process.exit(1);
        });
}
