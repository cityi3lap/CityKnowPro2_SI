@extends('layouts.app')

@section('styles')
    <link href="{{ asset('css/login.css') }}" rel="stylesheet">    
@endsection

@section('content')
<div class="content-page"> 
    <div class="container">
        <div class="content-cardLogin row justify-content-center align-items-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        <form method="POST" action="{{ route('login') }}">
                            @csrf
    
                            <div class="form-group row justify-content-center">
                                <div class="col-md-6">
                                    <img src="{{ asset('img/Mesa_de_trabajo_1_1.png') }}" class="img-fluid" alt="Responsive image">
                                </div>
                            </div>
    
                            <div class="form-group row justify-content-center">
                                <div class="col-md-6 ">
                                        <div class="input-group">
                                                <input id="identity" type="identity" class="form-login form-control @error('identity') is-invalid @enderror" name="identity" placeholder="Nombre de usuario o email" value="{{ old('identity') }}" required autocomplete="identity" autofocus>
    
                                                @error('identity')
                                                    <span class="invalid-feedback" role="alert">
                                                        <strong>{{ $message }}</strong>
                                                    </span>
                                                @enderror   
                                            <div class="input-group-append">
                                                  <span class="input-group-text" id="basic-addon2">
                                                      <i class="fas fa-user"></i>
                                                    </span>
                                                </div>
                                        </div>
                                   
                                </div>
                            </div>
    
                            <div class="form-group row justify-content-center">
                                <div class="col-md-6 d-flex justify-content-center">
                                        <div class="input-group">
                                                <input id="password" type="password" class="form-login form-control @error('password') is-invalid @enderror" name="password"  placeholder="Contraseña" required autocomplete="current-password">
    
                                    @error('password')
                                        <span class="invalid-feedback" role="alert">
                                            <strong>{{ $message }}</strong>
                                        </span>
                                    @enderror
                                            <div class="input-group-append">
                                                  <span class="input-group-text" id="basic-addon2">
                                                        <i class="fas fa-lock"></i>
                                                  </span>
                                                </div>
                                              </div>
                                   
                                </div>
                            </div>
    
                            <div class="form-group row col-12 ml-0 justify-content-center">
                                    <div class="col-md-6 d-flex p-0 justify-content-center"> 
                                            <button type="submit col-md-6" class="btn btn-primary">
                                                    {{ __('INGRESAR') }}
                                            </button>
                                    </div>
                            </div>
    
                            <div class="form-group row justify-content-center align-items-center">
                                
                                <div>
                                    @if (Route::has('password.request'))
                                    <a class="btn row btn-link" href="{{ route('password.request') }}">
                                        {{ __('¿Olvidaste tu contraseña?') }}
                                    </a>
                                @endif
                                </div>
                                        <div class="custom-control custom-checkbox">
                                                <input type="checkbox"  class="custom-control-input" 
                                                id="remember" name="remember" {{ old('remember') ? 'checked' : '' }} >
                                                
                                                <label class="custom-control-label" for="remember">
                                                        {{ __('Recordar mis datos') }}
                                                    </label>
                                        </div>
                                </div>
                                
                                
                            </div>
                            
                            
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
</div>
    
</div>
@endsection
