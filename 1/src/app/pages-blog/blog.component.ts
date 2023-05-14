import { Component, OnInit } from '@angular/core';
import { IBlogResponce } from 'src/app/shared/interfaces/blog.interface';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  public userBlog!: IBlogResponce[];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getBlog();
  }

  getBlog(): void {
    this.blogService.getAll().subscribe(data => {
      this.userBlog = data;
    })
  }

}
