// import { Controller, Get, Param } from '@nestjs/common';
// import { AppService } from './app.service';


// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) { }

//   @Get(':name')
//   getHello(@Param('name') name: string): string {
//     return this.appService.getHello(name);
//   }
// }



import { Controller, Get, Header, HttpCode, HttpStatus, Patch, Post, Res } from "@nestjs/common";
import { Response } from "express";

@Controller()
export class AppController {
  elementos = ['coche', 'moto', 'bicicleta']
  @Get()
  getAll() {
    // return this.elementos;
    // return 'Estos son los elementos';
    // return this.elementos.length;
    return {
      message: 'Peticion correcta',
      data: this.elementos,
    };
  }

  @Post()
  create() {
    this.elementos.push('nuevo elemento');
    return this.elementos;
  }

  @Post('http-code')
  @HttpCode(HttpStatus.NO_CONTENT)
  httpCode1() {
    this.elementos.push('Otro elemento');
    return;
  }

  @Patch('http-code')
  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  httpCode2() {
    this.elementos[0] = 'vehiculo editado';
    console.log('Se ha modificado el primer elemento del array');
    return `Edited: ${this.elementos[0]}`;
  }

  @Get('header')
  @HttpCode(HttpStatus.ACCEPTED)
  @Header('mi-propiedad-header', 'el valor de la propiedad')
  responseWithDecoratorHeader() {
    return 'Esto es una respuesta con header';
  }

  @Get('library-speacific')
  librarySpecific(@Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .header('mi-propiedad-header-2', 'el valor de la propiedad')
      .jsonp('Todo ok con la librería específica');
  }

  @Get('combined-response')
  combineResponseStrategies(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.NOT_MODIFIED);
    res.header('mi-propiedad-header-3', 'el valor de la propiedad 3');
    // return 'Respuesta combinada, mirar en headers para verificar'; // FIXME: NO SÉ QUE PASO!
    return res.json('Respuesta combinada, mirar en headers para verificar');
  }

}


