import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Form, FormStatus} from "../entity/form.entity";
import {User} from "../entity/user.entity";

@Injectable()
export class FormService {
  constructor(@InjectRepository(Form) public readonly formRepository: Repository<Form>) {
  }

  public async save(form: Form): Promise<Form> {
    return this.formRepository.save(form);
  }

  public async reviewForm(formId: string, reviewed: boolean): Promise<Form> {
    const form: Form = await this.formRepository.findOne({where: {id: formId}});
    form.status = reviewed ? FormStatus.REVIEWED : FormStatus.IN_PROGRESS;
    return this.formRepository.save(form);
  }

  public async changeReviewer(formId: string, reviewer: User): Promise<Form> {
    const form: Form = await this.formRepository.findOne({where: {id: formId}});
    form.reviewer = reviewer;
    return this.formRepository.save(form);
  }

  public async getByOwner(owner: User): Promise<Form[]> {
    return this.formRepository.find({where: {owner}});
  }
}
