import { Component, OnInit } from '@angular/core';
import { IBlogResponce } from 'src/app/shared/interfaces/blog.interface';
import { BlogService } from 'src/app/shared/services/blog.service';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss']
})
export class AdminBlogComponent implements OnInit {

  public title = '';
  public text = '';
  public author = '';
  public titleIsWrong = false;
  public textIsWrong = false;
  public authorIsWrong = false;
  public editStatus = false;
  public editID!: number;
  public adminBlog!: IBlogResponce[];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.blogService.getAll().subscribe(data => {
      this.adminBlog = data;
    });
  }

  addPost(): void {
    if(!this.checkInputs()) return;
    const random = Math.round(Math.random() * 5);
    const newPost = {
      author: this.author,
      title: this.title,
      text: this.text,
      image: `image_${random}.jpg`
    };
    this.blogService.create(newPost).subscribe(() => {
      this.getPosts();
      this.clearInputs();
    });
  }

  checkInputs(): boolean {
    if(!this.title) {
      this.titleIsWrong = true;
      return false;
    }
    this.titleIsWrong = false;
    if(!this.text) {
      this.textIsWrong = true;
      return false;
    }
    this.textIsWrong = false;
    if(!this.author) {
      this.authorIsWrong = true;
      return false;
    }
    this.authorIsWrong = false;
    return true;
  }

  clearInputs(): void {
    this.title = '';
    this.text = '';
    this.author = '';
  }

  editPost(post: IBlogResponce): void {
    this.authorIsWrong = false;
    this.titleIsWrong = false;
    this.textIsWrong = false;
    this.author = post.author;
    this.title = post.title;
    this.text = post.text;
    this.editID = post.id;
    this.editStatus = true;
  }

  updatePost(): void {
    if(!this.checkInputs()) return;
    const random = Math.round(Math.random() * 5);
    const updatePost = {
      author: this.author,
      title: this.title,
      text: this.text,
      image: `image_${random}.jpg`
    };
    this.blogService.update(updatePost, this.editID).subscribe(() => {
      this.getPosts();
      this.editStatus = false;
      this.clearInputs();
    });
  }

  deletePost(post: IBlogResponce): void {
    if(confirm('Are you sure?')) {
      this.blogService.delete(post.id).subscribe(() => {
        this.getPosts();
      })
    }
  }

}
