import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  homeContainer: HTMLElement | null;
  workContainer: HTMLElement | null;
  skillsContainer: HTMLElement | null;
  aboutContainer: HTMLElement | null;
  contactContainer: HTMLElement | null;

  menuPages: HTMLElement[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getMenuPages();
    this.subscribeToHighlightActiveMenuItem();
  }

  getMenuPages() {
    this.homeContainer = document.getElementById('home-container');
    this.workContainer = document.getElementById('work-container');
    this.skillsContainer = document.getElementById('skills-container');
    this.aboutContainer = document.getElementById('about-container');
    this.contactContainer = document.getElementById('contact-container');

    if (this.workContainer) {
      this.menuPages.push(this.workContainer);
    }
    if (this.skillsContainer) {
      this.menuPages.push(this.skillsContainer);
    }
    if (this.aboutContainer) {
      this.menuPages.push(this.aboutContainer);
    }
    if (this.contactContainer) {
      this.menuPages.push(this.contactContainer);
    }
  }

  scrollToHome() {
    this.homeContainer?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToWork() {
    this.workContainer?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToSkills() {
    this.skillsContainer?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToAbout() {
    this.aboutContainer?.scrollIntoView({ behavior: 'smooth' });
  }

  scrollToContact() {
    this.contactContainer?.scrollIntoView({ behavior: 'smooth' });
  }

  subscribeToHighlightActiveMenuItem() {
    const visiblePages: IntersectionObserverEntry[] = [];
    const observer = new IntersectionObserver(
      (pages) => {
        pages.forEach((page) => {
          this.updateVisiblePages(page, visiblePages);
          const visiblePageIds = visiblePages.map((page) => page.target.id);
          this.handleMenuHighLight(visiblePageIds);
        });
      },
      { threshold: 0.2 }
    );

    this.menuPages.forEach((pageContainer) => {
      observer.observe(pageContainer);
    });
  }

  updateVisiblePages(
    intersectionObserverEntry: IntersectionObserverEntry,
    visiblePages: IntersectionObserverEntry[]
  ) {
    if (intersectionObserverEntry.isIntersecting) {
      visiblePages.push(intersectionObserverEntry);
    } else {
      const notVisiblePageIndex = visiblePages.findIndex(
        (page) => intersectionObserverEntry.target.id === page.target.id
      );
      if (notVisiblePageIndex >= 0) {
        visiblePages.splice(notVisiblePageIndex, 1);
      }
    }
  }

  handleMenuHighLight(visiblePageIds: string[]) {
    if (!visiblePageIds.length) {
      return;
    }
    this.sortVisiblePageIds(visiblePageIds);
    const activePageId = visiblePageIds[0];
    const activeMenuId = `${activePageId.split('-')[0]}-menu`;
    const activeMenuElement = document.getElementById(activeMenuId);
    this.removeHighlightFromAllMenuItem();
    activeMenuElement?.classList.add('active');
  }

  sortVisiblePageIds(visiblePageIds: string[]) {
    visiblePageIds.sort((id1, id2) => {
      const page1 = document.getElementById(id1);
      const page2 = document.getElementById(id2);
      return page1 && page2 ? page1?.offsetTop - page2?.offsetTop : 1;
    });
  }

  removeHighlightFromAllMenuItem() {
    const menuElements = document.getElementsByClassName('menu-item');
    for (let i = 0; i < menuElements.length; i++) {
      menuElements[i].classList.remove('active');
    }
  }
}
