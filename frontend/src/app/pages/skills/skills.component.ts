import { Component, OnInit } from '@angular/core';

declare var TagCanvas: any;
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    try {
      TagCanvas.Start('skills-canvas', 'skill-list', {
        textColour: '#ffffff',
        reverse: true,
        noSelect: true,
        depth: 0.8,
        minSpeed: 0.02,
        maxSpeed: 0.02,
        initial: [0.04, -0.04],
        shuffleTags: true,
        wheelZoom: false,
      });
    } catch (e) {
      const canvasContainer = document.getElementById('skills-canvasContainer');
      if (canvasContainer) {
        canvasContainer.style.display = 'none';
      }
    }
  }

  showSkill(skillId: string) {
    TagCanvas.TagToFront('skills-canvas', { id: skillId, time: 1000 });
  }
}
