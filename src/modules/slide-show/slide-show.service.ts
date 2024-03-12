import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Slideshow } from './schema/slideShow-schema';

@Injectable()
export class SlideShowService {
    constructor(
        @InjectModel(Slideshow.name) private readonly slideShowModel: Model<Slideshow>
    ){}
}
