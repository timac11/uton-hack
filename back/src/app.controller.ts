import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './storage/service/user.service';
import {AppService} from "./app.service";
import {FormService} from "./storage/service/form.service";

@Controller()
export class AppController {
  constructor(private authService: AuthService,
              private appService: AppService,
              private formsService: FormService,
              private usersService: UsersService) {}

  //TODO add validation for user fields
  @Post("register")
  async register(@Request() req) {
    console.log(req.body);
    return  await this.usersService.save(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log("login");
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-form')
  createForm(@Request() req) {
    console.log(req.user);
    console.log(req.body);
    return this.appService.createForm(req.user.id, req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get("my-forms")
  getMyForms(@Request() req) {
    console.log(req.user);
    return this.appService.getFormsByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("my-reviews")
  getMyReviews(@Request() req) {
    console.log(req.user);
    return this.appService.getReviewsByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get("other-users")
  getUsersAcceptCurrent(@Request() req) {
    console.log(req.user);
    return this.appService.getOtherUsers(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("add-reviewer-by-id")
  addReviewerById(@Request() req) {
    console.log(req.user);
    return this.appService.addReviewerByIds(req.body.userId, req.body.formId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("submit-review")
  submitReview(@Request() req) {
    console.log(req.user);
    return this.appService.acceptReviewForm(req.user.id, req.body.formId);
  }

  @UseGuards(JwtAuthGuard)
  @Post("share-form")
  shareFormToUser(@Request() req) {
    console.log(req.user);
    return this.appService.shareFormToUsers(req.body.userIds, req.body.formId);
  }

  @UseGuards(JwtAuthGuard)
  @Get("shares")
  getSharesForUser(@Request() req) {
    console.log(req.user);
    return this.appService.getSharesForUser(req.user.id);
  }
}
