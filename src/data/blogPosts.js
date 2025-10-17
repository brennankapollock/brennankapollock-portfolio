// File tree structure for blog navigation
export const blogFileTree = {
  "interface-design": {
    type: "folder",
    name: "interface-design",
    displayName: "Philosophy",
    children: {
      "editorial-interfaces": {
        type: "folder",
        name: "editorial-interfaces",
        displayName: "Engineering",
        children: {},
      },
      typography: {
        type: "folder",
        name: "typography",
        displayName: "Typography",
        children: {},
      },
      "layout-systems": {
        type: "folder",
        name: "layout-systems",
        displayName: "Layout Systems",
        children: {},
      },
    },
  },
  development: {
    type: "folder",
    name: "development",
    displayName: "Development",
    children: {
      react: {
        type: "folder",
        name: "react",
        displayName: "React",
        children: {},
      },
      css: {
        type: "folder",
        name: "css",
        displayName: "CSS",
        children: {},
      },
      performance: {
        type: "folder",
        name: "performance",
        displayName: "Performance",
        children: {},
      },
    },
  },
  process: {
    type: "folder",
    name: "process",
    displayName: "Process",
    children: {
      "design-systems": {
        type: "folder",
        name: "design-systems",
        displayName: "Design Systems",
        children: {},
      },
      workflow: {
        type: "folder",
        name: "workflow",
        displayName: "Workflow",
        children: {},
      },
    },
  },
  culture: {
    type: "folder",
    name: "culture",
    displayName: "Culture",
    children: {
      art: {
        type: "folder",
        name: "art",
        displayName: "Art",
        children: {},
      },
    },
  },
};

export const blogPosts = [
  {
    id: "editorial-interfaces-modern-publishing",
    title: "Editorial Interfaces: Rethinking modern publishing platforms",
    slug: "editorial-interfaces-modern-publishing",
    date: "2025.9.17",
    author: "Brennan K.A. Pollock",
    readingTime: "8 min read",
    categories: ["interface-design", "editorial-interfaces"],
    excerpt:
      "How digital publishing platforms can learn from print design traditions while embracing modern interaction patterns.",
    content: `
# Editorial Interfaces: Rethinking modern publishing platforms

Many digital publishing platforms suffer from a fundamental disconnect between content and presentation. While print design has evolved sophisticated hierarchical systems over centuries, digital interfaces often flatten this rich tradition into generic templates.

## The Problem with Generic CMS

Content management systems typically approach editorial design through the lens of database efficiency rather than typographic excellence. This results in:

- Rigid template systems that ignore content context
- Poor typographic hierarchy
- Disconnected relationship between form and content
- Limited editorial control over presentation

## Learning from Print Traditions

Traditional editorial design operates on principles of:

**Hierarchy**: Clear visual relationships between different types of content
**Rhythm**: Consistent spacing and proportional systems
**Context**: Design decisions informed by content meaning
**Craft**: Attention to micro-typography and detail

## A New Approach

Modern editorial interfaces should bridge digital flexibility with typographic rigor. This means building systems that:

1. Understand content context
2. Provide meaningful editorial controls
3. Maintain typographic consistency
4. Enable experimentation within constraints

The future of digital publishing lies not in more features, but in better understanding of how content and form interact.
    `,
  },
  {
    id: "typography-systems-scale",
    title: "Typography Systems: Building scales that breathe",
    slug: "typography-systems-scale",
    date: "2025.9.15",
    author: "Brennan K.A. Pollock",
    readingTime: "5 min read",
    categories: ["interface-design", "typography"],
    excerpt:
      "Creating typographic systems that maintain rhythm and hierarchy across different contexts and screen sizes.",
    content: `
# Typography Systems: Building scales that breathe

Good typography systems are invisible infrastructure. They create rhythm, establish hierarchy, and guide the eye without calling attention to themselves.

## Beyond Static Scales

Traditional typographic scales work well in print, where the physical constraints are known. Digital interfaces demand systems that adapt while maintaining their essential character.

The challenge is creating scales that:
- Maintain proportional relationships
- Respond to context changes
- Preserve reading rhythm
- Work across different devices

## Modular Approaches

Rather than fixed pixel values, modern typography systems should be built on:

**Ratio-based scales**: Mathematical relationships that scale consistently
**Contextual adjustments**: Modifications based on content type
**Fluid responsiveness**: Smooth transitions between breakpoints
**Semantic hierarchy**: Meaning-driven rather than arbitrary sizing

This approach creates typography that feels both systematic and organic.
    `,
  },
  {
    id: "react-component-philosophy",
    title: "React Component Philosophy: Composition over inheritance",
    slug: "react-component-philosophy",
    date: "2025.9.12",
    author: "Brennan K.A. Pollock",
    readingTime: "6 min read",
    categories: ["development", "react"],
    excerpt:
      "Building flexible, maintainable component architectures through thoughtful composition patterns.",
    content: `
# React Component Philosophy: Composition over inheritance

React's component model encourages thinking in terms of composition rather than traditional object-oriented inheritance. This shift fundamentally changes how we structure applications.

## The Composition Advantage

Composition offers several benefits over inheritance:

- **Flexibility**: Components can be combined in unexpected ways
- **Testability**: Smaller, focused components are easier to test
- **Reusability**: Atomic components work in multiple contexts
- **Maintainability**: Changes are localized and predictable

## Practical Patterns

### Container/Presentational Split
Separating logic from presentation creates clearer component boundaries.

### Render Props
Functions as children enable flexible component reuse.

### Hook Composition
Custom hooks encapsulate stateful logic for reuse across components.

## Design System Integration

Component composition aligns naturally with design system thinking:

1. **Atomic components**: Basic building blocks
2. **Molecular patterns**: Common combinations
3. **Organism templates**: Complex compositions
4. **Page layouts**: Full implementations

This layered approach creates systems that are both consistent and adaptable.
    `,
  },
  {
    id: "css-architecture-scale",
    title: "CSS Architecture: Scaling styles without chaos",
    slug: "css-architecture-scale",
    date: "2025.9.10",
    author: "Brennan K.A. Pollock",
    readingTime: "7 min read",
    categories: ["development", "css"],
    excerpt:
      "Architectural approaches to CSS that maintain clarity and performance as projects grow.",
    content: `
# CSS Architecture: Scaling styles without chaos

CSS architecture becomes critical as projects grow beyond a few components. Without clear patterns, stylesheets quickly become unmaintainable.

## The Scaling Problem

As CSS codebases grow, common problems emerge:

- **Specificity wars**: Increasingly complex selectors
- **Dead code**: Styles that may or may not be in use
- **Unpredictable cascades**: Changes breaking unrelated components
- **Performance degradation**: Bloated stylesheets

## Architectural Solutions

### Component-Scoped Styles
Keep styles close to their components to reduce coupling.

### Utility-First Approaches
Atomic CSS utilities provide predictable, reusable styling patterns.

### CSS-in-JS
Runtime styling enables dynamic, component-aware styles.

### Design Token Systems
Shared values create consistency across styling approaches.

## Choosing the Right Tool

The best CSS architecture depends on:
- Team size and expertise
- Application complexity
- Performance requirements
- Design system maturity

No single approach works for every project, but clear patterns always beat ad-hoc solutions.
    `,
  },
  {
    id: "design-systems-documentation",
    title: "Design Systems: Documentation as a design problem",
    slug: "design-systems-documentation",
    date: "2025.9.8",
    author: "Brennan K.A. Pollock",
    readingTime: "4 min read",
    categories: ["process", "design-systems"],
    excerpt:
      "Why design system documentation deserves the same attention as the components themselves.",
    content: `
# Design Systems: Documentation as a design problem

Design systems are only as good as their documentation. Yet teams often treat documentation as an afterthought rather than a core design challenge.

## Documentation as Interface

Documentation is an interface between:
- Designers and developers
- System creators and consumers
- Present decisions and future changes
- Individual components and holistic thinking

Like any interface, it requires careful design.

## Beyond Component Libraries

Effective design system documentation includes:

**Principles**: Why decisions were made
**Patterns**: How components work together
**Examples**: Real-world implementations
**Guidelines**: When to use what

## Living Documentation

The best documentation evolves with the system:

1. **Version control**: Documentation changes with code
2. **Examples**: Generated from actual implementations
3. **Feedback loops**: Easy ways to suggest improvements
4. **Context**: Decision rationale preserved over time

Documentation is not separate from the design system—it is the design system.
    `,
  },
  {
    id: "performance-perceived-real",
    title: "Performance: The gap between perceived and measured speed",
    slug: "performance-perceived-real",
    date: "2025.9.5",
    author: "Brennan K.A. Pollock",
    readingTime: "6 min read",
    categories: ["development", "performance"],
    excerpt:
      "Understanding how user perception of speed differs from technical metrics and optimizing for both.",
    content: `
# Performance: The gap between perceived and measured speed

Technical performance metrics don't always align with user perception. A site can be technically fast but feel slow, or vice versa.

## Perceived vs. Measured

Users care about:
- **Time to meaningful content**: When can they start reading/interacting?
- **Interaction responsiveness**: Do clicks feel immediate?
- **Progress indication**: Do they know something is happening?
- **Smooth animations**: Does motion feel natural?

Technical metrics focus on:
- Time to first byte
- Bundle sizes
- Lighthouse scores
- Core Web Vitals

## Optimizing Perception

### Progressive Enhancement
Load content in meaningful chunks rather than waiting for everything.

### Optimistic UI
Show expected results immediately, correct if necessary.

### Skeleton Screens
Provide structure while content loads.

### Micro-interactions
Acknowledge user actions immediately.

## Balanced Approach

The best performance strategy addresses both technical metrics and user perception. Fast loading times matter, but so does the feeling of speed throughout the entire interaction.
    `,
  },
  {
    id: "workflow-creative-technical",
    title: "Workflow: Bridging creative and technical processes",
    slug: "workflow-creative-technical",
    date: "2025.9.3",
    author: "Brennan K.A. Pollock",
    readingTime: "5 min read",
    categories: ["process", "workflow"],
    excerpt:
      "Creating seamless workflows that honor both creative exploration and technical constraints.",
    content: `
# Workflow: Bridging creative and technical processes

The best digital work emerges from workflows that seamlessly integrate creative exploration with technical implementation.

## The Traditional Divide

Many teams operate with a handoff mentality:
1. Design explores possibilities
2. Specifications are created
3. Development implements designs
4. Issues are discovered and compromises made

This linear process often leads to suboptimal results.

## Integrated Approaches

Better workflows involve:

**Early technical input**: Developers participate in design decisions
**Prototype-driven design**: Testing ideas in code, not just static mockups
**Shared vocabulary**: Common language for discussing design/technical tradeoffs
**Iterative refinement**: Small adjustments based on implementation learnings

## Tools and Processes

### Design in Code
Build design tools that generate production-ready output.

### Component-Driven Development
Design and build in terms of reusable systems.

### Continuous Integration
Automatically test design implementations against specifications.

### Collaborative Reviews
Include both designers and developers in all reviews.

The goal is workflows where creative and technical thinking inform each other throughout the process.
    `,
  },
  {
    id: "art-influence-interface-design",
    title: "Art History: Lessons for interface designers",
    slug: "art-influence-interface-design",
    date: "2025.9.1",
    author: "Brennan K.A. Pollock",
    readingTime: "7 min read",
    categories: ["culture", "art"],
    excerpt:
      "How art movements and museum practices inform modern interface design thinking.",
    content: `
# Art History: Lessons for interface designers

Interface design can learn from centuries of visual art evolution. Art movements offer frameworks for thinking about hierarchy, composition, and user experience.

## Bauhaus and Functional Beauty

The Bauhaus movement emphasized:
- **Form follows function**: Design serves purpose
- **Grid systems**: Structural organization
- **Typography as design**: Text as visual element
- **Systematic thinking**: Consistent principles across mediums

These principles directly apply to interface design.

## Minimalism and Digital Interfaces

Minimalist art explores:
- **Essential elements**: What can be removed?
- **Spatial relationships**: How do elements interact?
- **User interpretation**: Active engagement with meaning
- **Material honesty**: Embracing medium constraints

Digital minimalism follows similar patterns.

## Museum Design Practices

Museums excel at:

**Information hierarchy**: Guiding visitor attention
**Wayfinding systems**: Clear navigation patterns
**Context presentation**: Framing content appropriately
**Accessibility**: Serving diverse audiences

## Contemporary Applications

Modern interface design benefits from art historical thinking:

1. **Compositional techniques**: Classical proportions and balance
2. **Color theory**: Emotional and functional color use
3. **Cultural context**: Understanding audience backgrounds
4. **Experimental approaches**: Pushing beyond conventional patterns

Art history provides a rich vocabulary for discussing and creating digital experiences.
    `,
  },
];

// Helper function to get posts by category path
export function getPostsByCategory(categoryPath) {
  if (!categoryPath) return blogPosts;

  return blogPosts.filter((post) =>
    post.categories.some((cat) => cat === categoryPath),
  );
}

// Helper function to get posts by folder and subfolder
export function getPostsByPath(folderName, subfolderName = null) {
  return blogPosts.filter((post) => {
    if (subfolderName) {
      return (
        post.categories.includes(folderName) &&
        post.categories.includes(subfolderName)
      );
    }
    return post.categories.includes(folderName);
  });
}

// Helper function to populate file tree with posts
export function populateFileTree() {
  const tree = JSON.parse(JSON.stringify(blogFileTree)); // Deep clone

  blogPosts.forEach((post) => {
    const [folder, subfolder] = post.categories;

    if (tree[folder] && tree[folder].children[subfolder]) {
      if (!tree[folder].children[subfolder].children[post.slug]) {
        tree[folder].children[subfolder].children[post.slug] = {
          type: "file",
          name: post.slug,
          displayName: post.title,
          post: post,
        };
      }
    }
  });

  return tree;
}

// Helper function to get all unique categories
export function getAllCategories() {
  const categories = new Set();
  blogPosts.forEach((post) => {
    post.categories.forEach((cat) => categories.add(cat));
  });
  return Array.from(categories);
}

// Helper function to get post by slug
export function getPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}
