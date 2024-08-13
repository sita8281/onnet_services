from .main import app, templates
from fastapi import Request, Response, Form
from fastapi.responses import RedirectResponse
from .auth import auth_protect, auth_protect_redirect, auth_login, logout_response
from typing import Dict, Annotated
from app.billing_api.exceptions import AuthFailed
from .config import Config


@app.get('/')
@auth_protect_redirect
async def main(request: Request, deil_account: dict = {}):
    return templates.TemplateResponse(request=request, name='index.html')


@app.get('/login')
@auth_login
async def login(request: Request, login_failed: str = ''):
    return templates.TemplateResponse(
        request=request,
        name='login.html',
        context={'login_failed': login_failed, 'static_version': Config.static_files_version}
    )


@app.post('/login')
@auth_login
async def login_form(request: Request, login: Annotated[str, Form()], passw: Annotated[str, Form()]):
    return {'user': login, 'passw': passw}


@app.get('/logout')
async def logout(request: Request):
    return logout_response



