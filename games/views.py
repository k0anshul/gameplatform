import random
from django.core.mail import send_mail
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
import time


def index(request):
    games = []

    for game_id, data in GAMES.items():
        game = data.copy()
        game["id"] = game_id
        games.append(game)

    return render(request, "games/index.html", {"games": games})



def register_view(request):
    if request.method == "POST":
        email = request.POST["email"]
        username = request.POST["username"]
        password = request.POST["password"]
         # Generate OTP
        otp = random.randint(100000, 999999)

       # Store data in session
        request.session["otp"] = otp
        request.session["email"] = email
        request.session["username"] = username
        request.session["password"] = password

          # Send OTP Email
        send_mail(
            "Your OTP Code",
            f"Your OTP is {otp}",
            "yourgmail@gmail.com",   # sender email
            [email],                 # receiver email
            fail_silently=False,
        )       
        
        return redirect("verify_otp")
    return render(request, "games/register.html")


def verify_otp(request):

    if request.method == "POST":

        entered_otp = request.POST["otp"]
        session_otp = str(request.session.get("otp"))

        if entered_otp == session_otp:

            username = request.session.get("username")
            email = request.session.get("email")
            password = request.session.get("password")

            User.objects.create_user(
                username=username,
                email=email,
                password=password
            )

            return redirect("login")

        else:
            return HttpResponse("Invalid OTP")

    return render(request, "games/verify_otp.html")




def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect("index")
    return render(request, "games/login.html")


@login_required
def play_game(request, game_id):
    SESSION_LIMIT = 3600  # 5 minutes

    game = GAMES.get(game_id)

    if not game:
        return HttpResponse("Game not found")

    session_key = f"game_start_{game_id}"

    if session_key not in request.session:
        request.session[session_key] = time.time()

    elapsed = time.time() - request.session[session_key]

    if elapsed > SESSION_LIMIT:
        request.session.pop(session_key, None)
        return HttpResponse("⛔ Session expired!")

    remaining = int(SESSION_LIMIT - elapsed)

    game_path = f"/static/games/playable/{game['folder']}/index.html"

    return render(request, "games/play.html", {
        "game_name": game["name"],
        "game_path": game_path,
        "remaining": remaining
    })


def logout_view(request):
    logout(request)
    return redirect("login")    


GAMES = {
    1: {"name": "Chess Neo", "image": "games/images/chess_Neo.jpg", "folder": "chess"},
    2: {"name": "Tetris Neo", "image": "games/images/Tetris_Neo.jpg", "folder": "tetris"},
    3: {"name": "Angry Birds Neo", "image": "games/images/angry_birds.jpg", "folder": "angry_birds_neo"},
    4: {"name": "Fruit Ninja Neo", "image": "games/images/fruit_Ninja_Neo.jpg", "folder": "fruit_ninja"},
}

