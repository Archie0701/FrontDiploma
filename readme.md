# Resend with Next.js (App Router)

This example shows how to use Resend with [Next.js](https://nextjs.org).

## Deploy your own

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/resend/resend-nextjs-app-router-example&project-name=resend-nextjs-app-router-example&repository-name=resend-nextjs-app-router-example&env=RESEND_API_KEY)

## Instructions

1. Define environment variables in `.env` file.

```sh
cp .env.example .env
```

2. Install dependencies:

```sh
npm install
# or
yarn
```

3. Run Next.js locally:

```sh
npm run dev
```

## KaizenCloud: README.md

### Project Description

**KaizenCloud** is a web application aimed at improving communication and boosting employee engagement within a company.

**Goal:**

* Provide a platform for employees to freely propose ideas and suggestions for improving the company's work.
* Create a system for evaluating and implementing ideas, where all suggestions have an equal chance of being considered, regardless of the author's position.
* Encourage active employee participation in the company's development by rewarding them for valuable ideas.

### Problem

Internal communication in companies is often ineffective. Employees, especially those in lower positions, may have valuable ideas that do not reach management or are ignored.

**KaizenCloud** solves this problem by providing:

* A **simple and intuitive interface** for proposing and discussing ideas.
* A **voting system** that allows other employees to express their support for ideas.
* An **automated process** for evaluating and implementing ideas based on objective criteria.
* A **rewards system** that rewards employees for valuable ideas.

### Solution

**KaizenCloud** is a web application built using modern technologies:

* **Front-end:** React, Next.js, HTML, CSS, JavaScript
* **Back-end:** Python, Django, Django REST Framework, Swagger, Docker

**Features:**

* **Idea submission:** Employees can easily create and publish their ideas, adding descriptions, benefits, and arguments.
* **Discussion:** Other employees can comment, vote for and against ideas, and ask questions of the authors.
* **Evaluation:** The evaluation system automatically evaluates ideas based on criteria such as the number of votes, relevance, feasibility, and potential impact.
* **Implementation:** Management can review highly rated ideas, make decisions about their implementation, and assign teams to carry them out.
* **Rewards:** Employees whose ideas have been implemented receive rewards in the form of bonuses, recognition, or career advancement.

### Development Team

* **Adil Sissenov:** Tech Lead, Project Manager
* **Symbat Yelubaeva:** UX/UI Designer
* **Beksultan Yerzhanov:** Front-End Developer
* **Artur Mukhitov:** Backend Development Specialist
* **Eldar Sharapiyev:** Front-End Developer

### Further Development

**KaizenCloud's** future development plans include integration with other company systems, expanding features for project and team management, and developing a mobile application.

### Contact

For more information about **KaizenCloud**, please contact us:

* Email: [Insert email address]
* Website: [Insert website address]


4. Make a curl request

```sh
curl -X POST http://localhost:3000/api/send
```

## License

MIT License
