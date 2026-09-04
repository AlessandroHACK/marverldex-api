import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { CharacterAlignment, CharacterStatus } from "../schemas/character.schema";

export class CreateCharacterDto {

    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Invalid name' })
    name: string;

    @IsNotEmpty( { message: 'Number is required'} )
    @IsNumber({},{ message: 'Invalid number'})
    @IsPositive({ message: 'Number must be positive' })
    @Min(1, {message: 'Number must be greater than 1'})
    no: number;

    @IsOptional()
    @IsString({ message: 'Invalid real name' })
    realName?: string;

    @IsOptional()
    @IsArray({ message: 'Aliases must be an array of strings' })
    @IsString({ each: true, message: 'Each alias must be a string' })
    aliases?: string[];

    @IsOptional()
    @IsString({ message: 'Invalid description' })
    description?: string;

    @IsOptional()
    @IsString({ message: 'Invalid publisher' })
    publisher?: string;

    @IsOptional()
    @IsString({ message: 'Invalid universe' })
    universe?: string;

    @IsOptional()
    @IsEnum(CharacterAlignment, { message: 'Invalid alignment' })
    alignment?: CharacterAlignment;

    @IsOptional()
    @IsEnum(CharacterStatus, { message: 'Invalid status' })
    status?: CharacterStatus;

    @IsOptional()
    @IsArray({ message: 'Teams must be an array of strings' })
    @IsString({ each: true, message: 'Each team must be a string' })
    teams?: string[];

    @IsOptional()
    @IsArray({ message: 'Powers must be an array of strings' })
    @IsString({ each: true, message: 'Each power must be a string' })
    powers?: string[];

    @IsOptional()
    @IsString({ message: 'Invalid first appearance' })
    firstAppearance?: string;

    @IsOptional()
    @IsArray({ message: 'Creators must be an array of strings' })
    @IsString({ each: true, message: 'Each creator must be a string' })
    creators?: string[];

    @IsOptional()
    @IsInt({ message: 'Comics count must be an integer' })
    @Min(0, { message: 'Comics count must be 0 or greater' })
    comicsCount?: number;
}
