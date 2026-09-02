import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { slugify } from "../../common/helpers/slugify.helper";

export enum CharacterAlignment {
    HERO = 'hero',
    VILLAIN = 'villain',
    ANTIHERO = 'antihero',
}

export enum CharacterStatus {
    ALIVE = 'alive',
    DECEASED = 'deceased',
    UNKNOWN = 'unknown',
}

//entity
@Schema({ timestamps: true })
export class Character {
    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    name: string;

    @Prop({ required: true, unique: true })
    no: number;

    @Prop({ unique: true, index: true })
    slug: string;

    @Prop({ trim: true })
    realName: string;

    @Prop({ type: [String], default: [] })
    aliases: string[];

    @Prop({ trim: true })
    description: string;

    @Prop({ trim: true })
    image: string;

    @Prop({ trim: true, default: 'Marvel Comics' })
    publisher: string;

    @Prop({ trim: true })
    universe: string;

    @Prop({ type: String, enum: CharacterAlignment, default: CharacterAlignment.HERO })
    alignment: CharacterAlignment;

    @Prop({ type: String, enum: CharacterStatus, default: CharacterStatus.UNKNOWN })
    status: CharacterStatus;

    @Prop({ type: [String], default: [] })
    teams: string[];

    @Prop({ type: [String], default: [] })
    powers: string[];

    @Prop({ trim: true })
    firstAppearance: string;

    @Prop({ type: [String], default: [] })
    creators: string[];

    @Prop({ default: 0, min: 0 })
    comicsCount: number;
}

export type CharacterDocument = HydratedDocument<Character>;
export const CharacterSchema = SchemaFactory.createForClass(Character);

CharacterSchema.pre('validate', function () {
    if (this.name) {
        this.slug = slugify(this.name);
    }
});